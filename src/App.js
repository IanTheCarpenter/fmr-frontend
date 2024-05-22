import {useEffect, useState} from 'react'
import './App.css';

import db from './data/zipcodes_database_v2.json'
import LineGraph from './components/lineGraph'
import ZipCodeMenu from './components/ZipcodeMenu'

// this is where we'd get the data 
// const currentFMRData = db[0]

const BASE_URL = 'http://localhost:3001/api/v1/ziplookup/'


function App() {
  const [nothingSelectedYet, setNothingSelectedYet] = useState(true)
  const [currentZipCode, setCurrentZipCode] = useState(null)
  const [data, setData] = useState({
    labels: ["years"],
    datasets: [{label:"null", data:[1,2,3]}]
  })


  // useEffect(() => {
  //   if (currentZipCode) {
  //     console.log(`FETCHING DATA FOR ZIP: ${currentZipCode}`)
  //     fetch(`${BASE_URL}/${currentZipCode}`)
  //       .then(response => response.json())
  //       .then(fmrRawData => setData({
  //         labels: ['Years']

  //       })))
  //       .catch(error => console.error(error)) 
  //   }
  // },[currentZipCode])
  
  useEffect(() => {
    if (currentZipCode) {
      console.log(`MAIN: changed zip to: ${currentZipCode}`)
      setNothingSelectedYet(false)
    }
  },[currentZipCode])


    return (
      <> 
        <div class="menu">
          <h1>Rent Prices by Zip</h1> 
          <ZipCodeMenu 
            value={currentZipCode}
            setCurrentZipCode={setCurrentZipCode}
          />

        </div>

        <div class="mainGraph">
          <h2>Look at this graph</h2>
          <LineGraph nothingSelectedYet={nothingSelectedYet} zipCode={currentZipCode} data={data}/>
        </div>
      </>
    );
}
export default App;
