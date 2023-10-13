import React, { useState } from 'react'
import Navbar from '../Components/navbar.js'

const HomePage = () => {

  // const handelContextMenu =(e) =>{
  //   e.preventDefault()
  // }

  // document.addEventListener("contextmenu",handelContextMenu)
  // return()=>{
  //   document.removeEventListener("contextmenu",handelContextMenu)
  // }
  const [search, setSearch] = useState('')

  const searchBtn = async (e) => {
    e.preventDefault()
    const url = `/search/${search}`;
    console.log(url)
    window.open(url, '_self')
  }
  return (
    <>
      <Navbar />
      <div className='search'>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-6'>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button class="btn btn-outline-success my-2 my-sm-0" onClick={searchBtn} type="submit">Search</button>
            </form>
          </div>
          <div className='col-3'></div>
        </div>
      </div>
    </>
  )
}

export default HomePage