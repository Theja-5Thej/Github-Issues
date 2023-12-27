import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import './Styling/Display.css'
import Comments from './Comments'
import Form from './Form'

const Display = () => {
    const [disComments, setdisComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [toggle, setToggle] = useState(false)
    const [rowToEdit, setRowTOEdit] = useState(null)
    const [data, setData] = useState([])
    const [rows, setRows] = useState(JSON.parse(localStorage.getItem("Data2"))||[])
    const [dataChange, setDataChange] = useState(false);
   
    const itemsPerPage = 6
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const items = rows.slice(firstIndex, lastIndex)
    const npage = Math.ceil(rows.length / itemsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const url = 'https://api.github.com/repos/octocat/hello-world/issues'
    // useEffect(() => {
    //     const fetch = async () => {
    //         const res = await axios.get(url)
    //         setData(res.data)
    //         localStorage.setItem('Data2', JSON.stringify(res.data))
    //         console.log(res.data)
    //     }
    //     fetch()
       
    // }, [])
   
    const addingRow = (newRow) => {
        const arr = [...rows,newRow]
        setRows(arr)
        localStorage.setItem('Data2', JSON.stringify(arr))
    }
    const prePage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    };
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
    const commitChange = useCallback(buttonId => {
      
        setdisComments(prevState => ({
            ...prevState,
            [buttonId]: !prevState[buttonId]
        }));
    }, []);
    return (
        <div className="main">
        
            <div className='title'><h2>Add Your Issuses</h2><button className='add' onClick={() => setToggle(true)}>Add</button></div>
            {toggle && <Form fun={setToggle} addingRow={addingRow} />}
            
            {items && items.map((x, index) => {
                return (
                    <div className="main-container-1" key={index}>
                        <div className='main-container-2'>
                            <div className='icons'><a href={x.url}><h4>{x.title}</h4></a></div>
                            <div className='sub-2'>
                                <div className='main-1'>
                                    <p>Name-{x.user.login}</p>
                                    <p>Created At-{x.created_at}</p>
                                </div>
                                <div className='main-2'>
                                    <div onClick={() => commitChange(x.id)}>
                                        <p>Comments-{x.comments}</p>
                                    </div>
                                    <p>Updated At-{x.updated_at}</p>
                                </div>
                            </div>
                        </div>
                        {disComments[x.id] && <Comments commetsUrl={x.comments_url} fun={commitChange} id={x.id}/>}
                    </div>
                )
            })
            }
            <nav>
                <ul className='pagination'>
                    <li className='page-item-nav'>
                        <a href="#" className='page link'
                            onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => {
                            return (
                                <li className={`page-item1  ${currentPage === n ? 'active' : ''}`}>
                                    <a href='#' onClick={() => changeCPage(n)}>{n}</a>
                                </li>
                            )
                        })
                    }
                    <li className='page-item-nav'>
                        <a href="#" className='page link'
                            onClick={nextPage}>Next</a>
                    </li>
                </ul>

            </nav>

        </div>
    )
}

export default Display