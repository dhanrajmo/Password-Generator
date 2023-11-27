import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'
import background from "C:/Users/dhanraj.mohite/React Project/Password-Generator/public/background.jpg";

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    () => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*()'

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }
  , [length,numberAllowed,charAllowed,setPassword] )

  const copyPasswordtoClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },
  [password]
  )

  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin:'auto',
        backgroundImage :`url(${background})`,
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat'
      }}>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
          <h1 className='text-white text-center my-3'>Password Generator <div style={{fontSize: "10px",textAlign: "right",
    marginRight: "15px"
        }}> ~ by Dhanraj Mohite</div></h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly
              ref={passwordRef} />
            <button
              onClick={copyPasswordtoClip}
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label>Length: {length} </label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => { setnumberAllowed((prev) => !prev); }}
              />
              <label htmlFor='numberInput'> Numbers</label>
            </div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => { setcharAllowed((prev) => !prev); }}
            />
            <label htmlFor='characterInput'> Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
