import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from './adminNavbar'
import { useAuth } from '../Context/auth'

export const SearchResultAdmin = () => {

  const [searchResult, setSearchResult] = useState([])
  const { keyword, category } = useParams()
  const [auth] = useAuth()

  const getSearchResult = async () => {
    try {
      const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/search/${keyword}/${category}`)
      setSearchResult(data)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteSea = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:1000/api/v1/seamov/delete-seamov/${id}`, {
        headers: {
          "auth-token": auth.token
        }
      })
      getSearchResult();
      console.log(`${data} is deleted`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  console.log(searchResult)

  useEffect(() => {
    getSearchResult()
  }, [])

  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <div className='row'>
          {searchResult.map((se) => (
            <div className='col-6' key={se._id}>
              <div className='row'>
                <div className='col-2'>
                  {se.name}
                </div>
                <div className='col-2'>
                <a href={`/admin/dashboard/edit-season/${se._id}`}>
                    <button>Edit</button>
                  </a>
                </div>
                <div className='col-2'>
                  <button className="danger" onClick={() => deleteSea(se._id)}>
                    Delete
                  </button>  

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default SearchResultAdmin;
