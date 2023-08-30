import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/auth';
import AdminNavbar from './adminNavbar';

const AllMovies = () => {
  const [movie, setMovie] = useState(null);
  const [auth] = useAuth('');

  const getMovie = async () => {
    try {
      const { data } = await axios.get("http://localhost:1000/api/v1/seamov/get-seaMovis/Movie");


      if (data) {
        setMovie(data);
      }
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const deleteMov = async(id) =>{
    try{
      const {data} = await axios.delete(`http://localhost:1000/api/v1/seamov/delete-seamov/${id}`,{
        headers:{
          "auth-token":auth.token
        }
      })
      getMovie();
      console.log(`${data} is deleted`)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }



  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <div className='row'>
          <div className='col-12 allmovie'>
            {movie && (
                <>
                <img height={'200px'} src={`http://localhost:1000/api/v1/seamov/sea-photo/${movie._id}`} /> 
                <h1>{movie.name}</h1>
                <a href={`/admin/dashboard/edit-movie/${movie._id}`}>
                  <button >Edit</button>
                </a>
                <button className='danger' onClick={() => deleteMov(movie._id)}>Delete</button>
              </>
            )}
          </div>

        </div>
        </div>
      </>
      );
}

      export default AllMovies;
