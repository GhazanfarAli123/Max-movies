import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { useAuth } from '../Context/auth';

const AddMovie = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');
  const [movie, setMovie] = useState('');
  const [auth] = useAuth();
  const [selected, setSelected] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateMovie, setUpdateMovie] = useState('');

  const create_movies = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:1000/api/v1/movie/create-movies',
        { name , movie },
        {
          headers: {
            'auth-token': auth.token,
          },
        }
      );
      get_movie();
      // Handle the response data as needed
    } catch (err) {
      console.log(err);
      alert('movie already exists plz enter valid movie');
    }
  };

  const get_movie = async () => {
    try {
      const { data } = await axios.get('http://localhost:1000/api/v1/movie/get-movies');
      setMovies(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_movie();
  }, []);

  const delete_movies = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:1000/api/v1/movie/delete-movies/${id}`, {
        headers: {
          'auth-token': auth.token,
        },
      });
      console.log(`${data} gernses is deleted`);
      get_movie();
    } catch (err) {
      console.log(err);
    }
  };

  const update_gernse = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `http://localhost:1000/api/v1/movie/update-movies/${selected._id}`,
        { name: updateName },
        {
          headers: {
            'auth-token': auth.token,
          },
        }
      );
      console.log(`${data.name} gernse is updated`);
      get_movie();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <form onSubmit={create_movies}>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Enter Movie Nmae</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter Movie Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter Movie iframe'
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Gerneses</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((c, index) => (
              <tr key={c.id}>
                <th scope='row'>{index + 1}</th>
                <td>{c.name}</td>
                <td>{c.movie}</td>

                {/* <td dangerouslySetInnerHTML={{ __html: c.movie }}></td> */}
                <td>
                  <button type='button' className='btn btn-danger' onClick={() => delete_movies(c._id)}>
                    DELETE
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      setUpdateName(c.name);
                      setUpdateMovie(c.movie);
                      setSelected(c);
                    }}
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Update Category
                </h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <form onSubmit={update_gernse}>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Update Category</label>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputEmail1'
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      aria-describedby='emailHelp'
                      placeholder='Enter update Gernse'
                    />
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputEmail1'
                      value={updateMovie}
                      onChange={(e) => setUpdateMovie(e.target.value)}
                      aria-describedby='emailHelp'
                      placeholder='Enter update Gernse'
                    />
                  </div>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                </form>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovie;
