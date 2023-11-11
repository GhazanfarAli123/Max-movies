import React ,{useEffect, useState}from "react"
import axios from 'axios'

function navbar() {

  const [category, setCategory] = useState([])

  const getCategories = async() =>{
    try{
      const {data} = await axios.get("http://localhost:1000/api/v1/category/get-category")
      setCategory(data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getCategories();
  },[])

  return (
    <>
      <nav id="we" class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a  class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div  class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {category.map((c)=>(
                  <li id="ww" class="nav-item" key={c._id}>
                    <a class="nav-link" aria-current="page" href={`/category/${c.slug}`}>{c.name}</a>
                  </li>  
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default navbar;