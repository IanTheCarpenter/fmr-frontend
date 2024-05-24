import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { BarController, Chart, Interaction, registerables} from "chart.js";
Chart.register(...registerables)

export default function LineGraph(props) {
  const {
    data,
    zipCode,
    apiError
  } = props

  // const [focusedLine, setFocusedLine] = useState(false)

  // function focusLine(event, legendItem, legend) {
  //   console.log(legendItem)
  // }

  

  const lineChartConfig = {
    // backgroundColor: 'rgb(100,1,100)',
    borderWidth: 2.5,
    spanGaps: true,
    tension: .5,
    pointStyle: 'rectRot',
    pointRadius: 5,
    pointHoverRadius: 10,
    drawActiveElementsOnTop: true,
    plugins: {
      legend: {
        align: 'start',
        position: 'bottom',
      }
    }
  }

  if (apiError) {
    return <p>Error Fetching data: {apiError}</p>
  }
  if(zipCode === null) {
    return <p>Please Select a Zip Code</p>
  }
  if (!data) {
    return <p>Loading data...</p>
  }
  return (
    <Line data={data} options={lineChartConfig} hidden={true} />
  ) 
}
