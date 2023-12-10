import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const[length,setLength]=useState(8)
  const[numAllowed,setNumAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState("")

  //useRef
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" //chars used for password
    if(numAllowed)
      str+="0123456789"
    if(charAllowed)
      str+="!@#$%^&*()_+=-*[]{}`~"
    for (let index = 1; index <= length; index++) {
      let char=Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed, setPassword]) //setPassword is run only once at a time (like while reload) if we give password instead then it goes for infinite loop
  useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed,passwordGenerator])
  
  const copyClip=useCallback(()=>{
    passwordRef.current?.select()
    //passwordRef.current?.setSelectionRange(0,3) //will set select only a range of values
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-500'>
        <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 my-4 rounded-xl' placeholder='Password' ref={passwordRef}/>
          <button className='bg-orange-300 outline-none py-1 px-3 my-4 rounded-xl text-white' onClick={copyClip}>COPY</button>
        </div>
        <div className='flex gap-x-2'>
          Length={length}
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          Number
          <input type="checkbox" className='cursor-pointer' onChange={()=>{console.log(numAllowed); setNumAllowed(prev=>!prev)}}/>
          Character
          <input type="checkbox" className='cursor-pointer' onChange={()=>{console.log(charAllowed); setCharAllowed(prev=>!prev)}}/>
        </div>
      </div>
    </>
  )
}

export default App
