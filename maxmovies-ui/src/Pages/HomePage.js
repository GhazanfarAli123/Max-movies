import React from 'react'
import Navbar from '../Components/navbar.js'

const HomePage = () => {

    // const handelContextMenu =(e) =>{
    //   e.preventDefault()
    // }

    // document.addEventListener("contextmenu",handelContextMenu)
    // return()=>{
    //   document.removeEventListener("contextmenu",handelContextMenu)
    // }
    
  return (
    <>
    <Navbar />
    <div className='search'>
      <div className='search-screen'>
        <input className='search-bar' type='text'/>Search
      </div>
    </div>
    </>
  )
}

export default HomePage