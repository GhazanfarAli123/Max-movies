import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ClientNavBar = () => {

    const [gerneses , setGerneses] = useState([])
    const [category, setCategory] = useState([])
    const [countries, setCountries] = useState([])

    const [search, setSearch] = useState('')

    const searchBtn = async (e) => {
      e.preventDefault()
      const url = `/search/${search}`;
      console.log(url)
      window.open(url, '_self')
    }


    const getCountry = async (e) => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/country/get-country")
            setCountries(data)
        } catch (err) {
            console.log(err);
        }
    }

    const getCategories = async() =>{
      try{
        const {data} = await axios.get("http://localhost:1000/api/v1/category/get-category")
        setCategory(data)
      }catch(err){
        console.log(err)
      }
    }
    const getGerneses = async() =>{
        try{
            const {data} = await axios.get("http://localhost:1000/api/v1/gernse/get-gernse")
            setGerneses(data)
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        getGerneses();
        getCategories();
        getCountry();
    },[])

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">Navbar</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                        {category.map((c) =>(
                            <li class="nav-item active">
                                <a class="nav-link" href={`/category/${c.slug}`}>{c.name}</a>
                            </li>
                        ))}
                    </ul>
                    <div class="dropdown">
                        <button class="dropbtn">Dropdown<i class="fa fa-caret-down"></i></button>
                        <div class="dropdown-content">
                            {gerneses.map((g)=>(
                            <a href={`/gerneses/${g.slug}`}>{g.name}</a>
                            ))}
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Dropdown<i class="fa fa-caret-down"></i></button>
                        <div class="dropdown-content">
                            {countries.map((g)=>(
                            <a href={`/country/${g.slug}`}>{g.name}</a>
                            ))}
                        </div>
                    </div>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={searchBtn} type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default ClientNavBar