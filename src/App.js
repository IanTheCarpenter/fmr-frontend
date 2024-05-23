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
    datasets: [{label:"null", data:[1,2,3]}]
  })

  const [apiError, setApiError] = useState(false)
  

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

  useEffect(() => {
    if (currentZipCode){
      setApiError(false)
      console.log(`GRAPH: fetching data...`)
      setData(null)
      fetch(`${URL}/${currentZipCode}`)
      .then(res => {
        if (res.ok) {
          res.json().then(currentFMRData => {
            // process api response here
            const years = Object.keys(currentFMRData.data).map((year) => year.slice(1))
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
      <> 
        <div>
          <h1 class="mainTitle">Family Wage Calculator</h1> 
          <ZipCodeMenu 
            value={currentZipCode}
            setCurrentZipCode={setCurrentZipCode}
          />
        </div>
        <div class='sideBySide'>
          <Description/>
          <div class="extra-padding"></div>
          <div class='divider'></div>
          <div class="extra-padding"></div>
          <Results zipCode={currentZipCode} apiError={apiError} data={data}/>
        </div>
        <div class="mainGraph">
          <h2>Look at this graph</h2>
          <LineGraph zipCode={currentZipCode} data={data}/>
        </div>
      </>
    );
}
export default App;
