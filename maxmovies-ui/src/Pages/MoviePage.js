import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientNavBar from '../Components/ClientNavBar';
import Pr from "../Components/pr"

const MoviePage = () => {
    const { slug } = useParams();
    const [Movdata , setMovData]= useState([])

    const getMovSeason = async() =>{
        try{
            const {data} = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMov/${slug}`)
            setMovData(data)
            // console.log(data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getMovSeason()
    },[])

    return (
        <>
            <ClientNavBar />
            
            <div className='container'>
                <div className='row'>
                   <div className='col-lg-12'>
                    <Pr data={Movdata} />
                   </div>
                </div>
            </div>
           
        </>
    );
}

export default MoviePage;
