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
            setGraphData({
              labels: years,
              datasets: [
                {
                label: "Efficiency",
                data: Object.values(currentFMRData.data).map(i => i['Efficiency']).reverse()
              },
              {
                label: "One-Bedroom",
                data: Object.values(currentFMRData.data).map(i => i['One-Bedroom']).reverse()
              },
              {
                label: "Two-Bedroom",
                data: Object.values(currentFMRData.data).map(i => i['Two-Bedroom']).reverse()
              },
              {
                label: "Three-Bedroom",
                data: Object.values(currentFMRData.data).map(i => i['Three-Bedroom']).reverse()
              },
              {
                label: "Four-Bedroom",
                data: Object.values(currentFMRData.data).map(i => i['Four-Bedroom']).reverse()
              }
              ]
            })
          })
        }
        else {
          console.log(`FETCH ERROR: ${res.st}`)
          setAPIError(res.status)
        }
        })
      .catch(error => setAPIError(error.toString()))
      // .then(currentFMRData => {
      //   console.log(currentFMRData)
      //   // process api response here
      //   const years = Object.keys(currentFMRData.data).map((year) => year.slice(1))
      //   setGraphData({
      //     labels: years,
      //     datasets: [
      //       {
      //       label: "Efficiency",
      //       data: Object.values(currentFMRData.data).map(i => i['Efficiency']).reverse()
      //     },
      //     {
      //       label: "One-Bedroom",
      //       data: Object.values(currentFMRData.data).map(i => i['One-Bedroom']).reverse()
      //     },
      //     {
      //       label: "Two-Bedroom",
      //       data: Object.values(currentFMRData.data).map(i => i['Two-Bedroom']).reverse()
      //     },
      //     {
      //       label: "Three-Bedroom",
      //       data: Object.values(currentFMRData.data).map(i => i['Three-Bedroom']).reverse()
      //     },
      //     {
      //       label: "Four-Bedroom",
      //       data: Object.values(currentFMRData.data).map(i => i['Four-Bedroom']).reverse()
      //     }
      //     ]
      //   })
      // })

    }
  }, [zipCode])

  //   const request_options = {
  //     method: 'GET',
  //     headers: {
  //         Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiMTI3MTVmNDkwNTIwYjRiMDIxMmJlYmUzMmUzNmNlM2I3MDMxMmVlNGJmMDZkNDkwOTM0OGNhZThkM2QzNGRmMTU3ZjdmYjBmNTVjZTkyYzUiLCJpYXQiOjE3MTExNDA0NzkuNDkxNTE0LCJuYmYiOjE3MTExNDA0NzkuNDkxNTE2LCJleHAiOjIwMjY2NzMyNzkuNDg2NTk5LCJzdWIiOiI2NTMwMiIsInNjb3BlcyI6W119.ESx6ruYDCddetERjOlZVd93HJtnR7pwA4Lftz4TSZHx9YTurWN3b3g1S0uOWAHDkNRYFYsvOJFWgNhApCSEN8A"
  //     }
  // }

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
