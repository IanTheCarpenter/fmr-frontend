import React from 'react'
import { useState, useEffect } from 'react'
// import {useRef} from 'react'

export default function ZipcodeMenu(componentProperties) {
  const {
      setCurrentZipCode
  } = componentProperties
  
  const [validZip, setValidZip] = useState(false)
  const [isWarningMessageHidden, setIsWarningMessageHidden] = useState(true)
  const [inputZipCode, setInputZipCode] = useState(null)


  const onZipCodeInputFieldEdit = (event) => {
    if (event.target.value.length === 5) {
      setInputZipCode(event.target.value)
      setValidZip(true)
      setIsWarningMessageHidden(true)
      
    }
    else {
      setValidZip(false) 
    }
  }
 
  const handleUpdateZipCode = () => {
    if (validZip) {
     setCurrentZipCode(inputZipCode) 
    }
    else{
      setIsWarningMessageHidden(false)
    }
  }

  
  return (
    <div>

      <input 
        type='number' 
        onChange={onZipCodeInputFieldEdit}
      ></input>
      <button onClick={handleUpdateZipCode} type='submit'>Check</button>
      <div hidden={isWarningMessageHidden} class='warningText'>
        Please Enter a Valid Zip
      </div>
    </div>
  )
}
