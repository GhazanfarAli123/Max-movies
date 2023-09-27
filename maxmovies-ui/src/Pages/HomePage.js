import React, { useEffect } from 'react'
import Navbar from '../Components/navbar.js'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

const HomePage = () => {
  useEffect(()=>{
    const handelContextMenu =(e) =>{
      e.preventDefault()
    }

    document.addEventListener("contextmenu",handelContextMenu)
    return()=>{
      document.removeEventListener("contextmenu",handelContextMenu)
    }

  },[])
  return (
    <>
    <Navbar />
    <Stack spacing={2} direction="row">
      <Button variant="outlined">Outlined</Button>
    </Stack>
    </>
  
  )
}

export default HomePage