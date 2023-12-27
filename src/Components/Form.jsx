import React, { useState } from 'react'
import './Styling/Form.css'
import Display from './Display'
import axios from 'axios'

const Form = ({addingRow,fun}) => {
    const[error,setError] = useState()
    const [name,setName] = useState("")
    const [data,setData] =useState({
        title:"",
        url:"",
    
        user:{login:""},
        created_at:"",
        comments:[],
        updated_at:"",
        id:""
    })
    const date = new Date()
    const curr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}Z`
    const randomDecimal = Math.random();
  const min = 10000;
  const max = 99999;
  const randomFiveDigitNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

    const handleSubmit = e => {
        e.preventDefault()
        console.log(data)
        if(validate()){
            addingRow(data)
            console.log(data)
            fun()
        }
       
    }
    
    // const handleChange1 =e=>{
    //     setData(prev=>({
    //         ...prev,
    //         user:{login:e.target.value},
    //         created_at:curr,
    //         updated_at:curr,
    //         comments:data.comments.length,
    //         id:randomFiveDigitNumber,
    //     }))
    // }
    const handleChange = e=>{
        if(e.target.name==='user'){
            setData({
                ...data,
                user:{login:e.target.value},
                created_at:curr,
                        updated_at:curr,
                        // comments:data.comments.length,
                        id:randomFiveDigitNumber,
                
            })
        }else{
            setData({
                ...data,
                [e.target.name]:e.target.value, 
            }) 
        }
       
              
    }
    const validate =e=>{
        if(data.title && data.url && data.user.login){
            setError("")
            return true
        }else{
            let errorFields =[]
            for(const [key,value] of Object.entries(data)){
                if(!value) {
                    errorFields.push(key)
                }
            }
            setError(errorFields)
            return false
        }
    }
    return (
        <div className='model-container' onClick={e=>{
            if(e.target.className=== 'model-container') fun()
        }}>  
            <div className='model'>
                {error && <h5>Please Enter all manditory fileds </h5>}
                <form onSubmit={handleSubmit}>
                    <div className='block'>
                        <label>Title</label>
                        <input type='text' placeholder='Title'  name='title' onChange={handleChange}/>
                    </div>
                    <div className='block'>
                        <label>GitHub-URL</label>
                        <input type='text' placeholder='Url' name='url' onChange={handleChange} />
                    </div>
                    <div className='block'>
                        <label>Name</label>
                        <input type='text' placeholder='Name' name='user' onChange={handleChange}/>
                    </div>
                    <div><button className='btn'>Submit</button></div>
                </form>
            </div>  
        </div>
    )
}
export default Form