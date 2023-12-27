import axios from 'axios'
import './Styling/Comments.css'
import React, { useEffect, useState } from 'react'

const Comments = ({ commetsUrl,id ,fun}) => {
  const [comments, setComments] = useState([])
  const [toggle,setToggle] = useState(false)
  const [body, setBody] = useState("")
  
  useEffect(() => {
    const comp = async () => {
      const res = await axios.get(commetsUrl)
      setComments(res.data)
      
    }
    comp()
    
   
  }, [])
  const addComment = (e) => {
    const locatData= JSON.parse(localStorage.getItem("Comments"))
    for(const x  of locatData){
      if(x.id===id){
        x.data.push()
      }
    }
  }
  
  const getComments =()=>{
   const locatData= JSON.parse(localStorage.getItem("Comments"))
    if(locatData){
       for(let x  of locatData){
         if(x.id===id){
           setComments(x.data)
           return
         }
       }
       locatData.push({id:id,data:comments})
        localStorage.setItem('Comments', JSON.stringify(locatData))
      }else{
        localStorage.setItem('Comments', JSON.stringify([{id:id,data:comments}]))
      }
  }
  
 
  const date = new Date()
  const curr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}Z`
  return (
    <div className='c-main-container-1' onClick={e=>{
      if(e.target.className=== 'c-main-container-1') {
        console.log("clicked")
        fun(id)
      }
  }}>
      
      <div className="container-1">
        <div className="sub-1">
          <h4 className='cmt-head'>Comments..</h4>
          { comments.length !==0 ? comments.map((x, i) => {
            
            return (
              <div className='comment'>
                <div className='cmtname'><p>{x.body}</p></div>
                <div className='time'><p>Created-At: {x.created_at}</p>
                  <p> Updated-At: {x.updated_at}</p></div>
              </div>
            )
          }) : <h3 className='No-Cmts'>There are no comments...!</h3>
          }
        </div>
        <form className="form" onSubmit={addComment}>
          <textarea name='body' placeholder='add your comments..!' onChange={e => setBody(e.target.value)} />
          <button type='submit'>Add Comments</button>
        </form>
      </div>
    </div>
  )
}

export default Comments