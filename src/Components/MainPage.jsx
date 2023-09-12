import React, { useState } from 'react'
import Display from './Display'
import Form from './Form'

const MainPage = () => {
    const [toggle,setToggle] = useState(false)
  return (
    <div>
        <div>
           <span> Add Your Issues</span>
            <button onClick={()=>setToggle(true)}>Add</button>
            {toggle && <Form fun={setToggle}/>}
            
        </div>
    </div>
  )
}

export default MainPage