import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ClientNavBar from '../Components/ClientNavBar'

const CategoryPage = () => {


    const {id} = useParams()

    const getDataCategory = async() =>{
        try{
            const {data} = await axios.get(`http://localhost:1000/api/v1/seamov/get-seamovies/${id}`)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getDataCategory()
    },[])
  return (
    <>
        <ClientNavBar />
    
    </>
  )
}

export default CategoryPage