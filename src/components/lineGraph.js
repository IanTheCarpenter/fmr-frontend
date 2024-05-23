import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables} from "chart.js";
Chart.register(...registerables)

export default function LineGraph(props) {
  const {
    data,
    zipCode,
    apiError
  } = props

  const lineChartConfig = {
  }

  if (apiError) {
    return <p>Error Fetching data: {apiError}</p>
  }
  if(zipCode===null) {
    return <p>Please Select a Zip Code</p>
  }
  if (!data) {
    return <p>Loading data...</p>
  }
  return (
    <Line data={data} options={lineChartConfig} hidden={true} />
  ) 
}
