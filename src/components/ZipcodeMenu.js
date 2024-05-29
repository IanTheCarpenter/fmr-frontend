import React from 'react'
import { useState, useEffect } from 'react'
// import {useRef} from 'react'

export default function ZipcodeMenu(componentProperties) {
  const {
      setCurrentZipCode
  } = componentProperties
  
  const [validZip, setValidZip] = useState(false)
  const [messageText, setMessageText] = useState(' ')
  const [inputZipCode, setInputZipCode] = useState(null)


  const onZipCodeInputFieldEdit = (event) => {
    if (event.target.value.length === 5) {
      setInputZipCode(event.target.value)
      setValidZip(true)
      setMessageText(" ")
      
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
      setMessageText("Please Enter a Valid Zip")
    }
  }

  
  return (
    <div class='inputBar'>
      <div>
          <input 
            type='numeric'
            class='inputField'
            onChange={onZipCodeInputFieldEdit}
            >
          </input>
        <button class='checkButton' onClick={handleUpdateZipCode} type='submit'>Go</button>

          <div class='warningText'>
            {messageText}
          </div>
      </div>

    </div>
  )
}
