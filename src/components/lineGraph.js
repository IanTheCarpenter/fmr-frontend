import React, { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import { Chart, registerables} from "chart.js";
Chart.register(...registerables)

export default function LineGraph(props) {
  const {
    zipCode,
    nothingSelectedYet
  } = props

  const [apiError, setAPIError] = useState(false)
  const lineChartConfig = {
  }
  const URL = "http://localhost:3001/api/v1/ziplookup"

  const [graphData, setGraphData] = useState(null)

  const requiredHourlyWageFormula = (rent) => {

    // multiply the rent by 3 to get the monthly income needed to afford comfortably
    // divide by the 160 hours worked in a normal month to get the 

    const rawCalculation = (rent * 3) / 160
    


    return Math.round(Math.round(rawCalculation * 100)) / 100
  }

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


  useEffect(() => {

    if (zipCode){
      setAPIError(false)
      console.log(`GRAPH: fetching data...`)
      setGraphData(null)
      fetch(`${URL}/${zipCode}`)
      .then(res => {
        if (res.ok) {
          res.json().then(currentFMRData => {
            console.log(currentFMRData)
            // process api response here
            const years = Object.keys(currentFMRData.data).map((year) => year.slice(1))
            setGraphData(buildGraphData(currentFMRData.data))
          })
        }
        else {
          console.log(`FETCH ERROR: ${res.st}`)
          setAPIError(res.status)
        }
        })
      .catch(error => setAPIError(error.toString()))
    }
  }, [zipCode])


console.log(nothingSelectedYet)
  if (apiError) {
    return <p>Error Fetching data: {apiError}</p>
  }
  if(nothingSelectedYet) {
    return <p>Please Select a Zip Code</p>
  }
  if (!graphData) {
    return <p>Loading data...</p>
  }
  return (
    <Line data={graphData} options={lineChartConfig} hidden={true} />
  ) 
}
