import React, { useEffect, useState } from 'react'
import ClientNavBar from '../Components/ClientNavBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Pr from '../Components/pr'

const CountryPage = () => {

    const { slug } = useParams();
    const navigate = useNavigate();

    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [countrySeaMov, setCountrySeaMov] = useState([])

    const getCountry = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/country/get-country")
            setCountries(data)
        } catch (err) {
            console.log(err);
        }
    }

    const getCountryBySlug = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/country/get-country/${slug}`)
            setCountry(data[0]._id)
        } catch (err) {
            console.log(err);
        }
    }

    const countryId = country;
    useEffect(() => {

        const fetch = async() =>{
            try{
                await getCountry()
                await getCountryBySlug()
                if(countryId){
                    await getSeaMovData(countryId)
                }
            }catch(err){
                console.log(err);
                navigate('/404')
            }
        }
        fetch()
    }, [slug,navigate])

    
    useEffect(() => {
        if (countryId) {
            getSeaMovData(countryId)
        }
    }, [countryId])

    const getSeaMovData = async (countryID) => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMoviiss/${countryID}`)
            setCountrySeaMov(data)
        } catch (err) {
            console.log(err)
        }
    }

    const category = countries.find((cat) => cat.slug === slug);
    if (!category) {
        navigate('/404');
    }


    return (
        <>
            <ClientNavBar />
            <div className='container'>
                <div className='row'>
                    {countrySeaMov.map((e) => (
                        <div className='col-3'>
                            {e.name}
                        </div>
                    ))}

                    <Pr country={countrySeaMov} />
                </div>
            </div>
        </>
    )
}

export default CountryPage