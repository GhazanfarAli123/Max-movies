import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from './navbar'

const SearchResult = () => {
  
   const {keyword} = useParams();
   const [searchData , setData] = useState([])
    const getSearchData = async()=>{
        try{
            const {data} = await axios.get(`http://localhost:1000/api/v1/seamov/searches/${keyword}`)
            setData(data)
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getSearchData()
    },[])
  
    return (
        <>
            <Navbar />
            <div className='row'>
                {searchData.map((m)=>(
                    <>
                        <div className='col-3' key={m._id}>
                            {m.name}
                        </div>
                    </>
                ))}
            </div>

        </>
    )
}

export default SearchResult