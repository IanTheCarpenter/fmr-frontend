import React, { useEffect, useState } from 'react'

export default function Results(props) {
    const {zipCode, data, answer} = props

  return (<div class='results'>
    <h3> You would need to earn...</h3>
    <div class='answer'><span class='bigLetters'>{answer}$</span><span class='slash'>/</span><div class='littleLetters'>hr</div></div>
  </div>

  )
}
