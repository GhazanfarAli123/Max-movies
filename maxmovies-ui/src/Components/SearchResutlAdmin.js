import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const SearchResutlAdmin = () => {
  
  const {keyword,category} = useParams()

  const getSearchResult = async() =>{
    try{
      const {data} = await axios.get(`http://localhost:1000/api/v1/seamov/search/${keyword}/${category}`)
      console.log(data)

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
      getSearchResult();
  },[])

  return (
    <div>SearchResutlAdmin</div>
  )
}
