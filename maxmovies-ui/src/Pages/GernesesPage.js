import React, { useEffect, useState } from 'react'
import ClientNavBar from '../Components/ClientNavBar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Pr from '../Components/pr'

const GernesesPage = () => {

    const {slug} = useParams()
    const [gerneses , setGerneses] = useState([])
    const [gernesesBySlug , setGernesesBySlug] = useState('')
    const [gernesesData , setGernesesData] = useState([])
    const navigate = useNavigate()

    const getGerneses = async()=>{
        try{
            const {data} = await axios.get("http://localhost:1000/api/v1/gernse/get-gernse");
            setGerneses(data)
        }catch(err){
            console.error(err)
        }
    }

    const getGernesesBySlug = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/gernse/get-gernse/${slug}`);
            if(data && data.length > 0){
                setGernesesBySlug(data[0]._id);
            }else{
                navigate('/404')
            }
            } catch (err) {
            console.log(err);
            navigate('/404');
        }
    }
    
    useEffect(() =>{

        const fetchData = async() =>{
            try{
                await getGerneses();
                await getGernesesBySlug();
            }catch(err){
                console.error(err)
                navigate('/404')
            }
        }
        fetchData()

    },[slug,navigate])

    useEffect(()=>{
        if(gernesesBySlug){
            getGernData(gernesesBySlug)
        }
    },[gernesesBySlug])

    const getGernData = async(gernId) =>{
        try{
            const {data} = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMovGer/${gernId}`)
            setGernesesData(data)
        }catch(err){
            console.error(err)
        }
    }

  return (
    <>
        <ClientNavBar />
        <div className='row'>
            {gernesesData.map((e)=>(
                <>
                <div className='col-3'>
                    {e.name}
                    <img src={`http://localhost:1000/api/v1/seamov/sea-photo/${e._id}`} />
                </div>
                </>
            ))}
        </div>
    </>
  )
}

export default GernesesPage