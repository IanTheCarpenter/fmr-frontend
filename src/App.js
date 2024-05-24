import {useEffect, useState} from 'react'
import './App.css';

import LineGraph from './components/lineGraph'
import ZipCodeMenu from './components/ZipcodeMenu'
import Results from './components/results'
import Description from './components/description';
import { URL } from './env_vars'



function App() {
  const [currentZipCode, setCurrentZipCode] = useState(null)
  const [data, setData] = useState({
    labels: ["years"],
    datasets: [{label:"placeholder", data:[1,2,3]}]
  })

  const [apiError, setApiError] = useState(false)
  const [answer, setAnswer] = useState('--')
  
  const buildGraphData = (rawData) => {
    const years = Object.keys(rawData)

    let output = {
      labels: years.map((year) => year.slice(1)).reverse(),
      datasets: []
    }
    
    const apartmentTypes = Object.keys(rawData[Object.keys(rawData)[0]])

    apartmentTypes.forEach(apartmentType => {
      let apartmentTypeHistoricalPrices = {
        label: apartmentType,
        data: []
      }
      years.forEach(year => {
        apartmentTypeHistoricalPrices.data.push(requiredHourlyWageFormula(rawData[year][apartmentType]))
      })
      apartmentTypeHistoricalPrices.data = apartmentTypeHistoricalPrices.data.reverse()
      output.datasets.push(apartmentTypeHistoricalPrices)
    });

    return output
  }

  const requiredHourlyWageFormula = (rent) => {
    // multiply the rent by 3 to get the monthly income needed to afford comfortably
    // divide by the 160 hours worked in a normal month to get the required hourly rate
    const rawCalculation = (rent * 3) / 160
    return Math.round(Math.round(rawCalculation * 100)) / 100
  }

  useEffect(()=>{setApiError(apiError)}, [apiError])

  useEffect(() => {
    if (currentZipCode){
      setApiError(false)
      console.log(`GRAPH: fetching data...`)
      setData(null)
      fetch(`${URL}/${currentZipCode}`)
      .then(res => {
        if (res.ok) {
          res.json().then(currentFMRData => {
            setAnswer(requiredHourlyWageFormula(currentFMRData.data[Object.keys(currentFMRData.data)[0]][
              'One-Bedroom'
            ]))
            setData(buildGraphData(currentFMRData.data))
          })
        }
        else {
          console.log(`FETCH ERROR: ${res.status}`)
          setApiError(res.status)
        }
        })
      .catch(error => setApiError(error.toString()))
    }
  }, [currentZipCode])

    return (
      <div class='background'> 
        <h1 class="mainTitle">Family Wage Calculator</h1> 
        <ZipCodeMenu 
          value={currentZipCode}
          setCurrentZipCode={setCurrentZipCode}
        />
        <div class='sideBySide'>
          <Description/>
          <div class='divider'>
            <div class='dividerLine'></div>
          </div>
          <Results zipCode={currentZipCode} answer={answer} data={data}/>
        </div>
        <div class="mainGraph">
          <h2>Look at this graph</h2>
          <LineGraph zipCode={currentZipCode} data={data} apiError={apiError}/>
        </div>
      </div>
    );
}
export default App;
