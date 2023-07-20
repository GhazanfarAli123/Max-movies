import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { useAuth } from '../Context/auth';

const AddEpisode = () => {
  const [episodes, setEpisodes] = useState([]);
  const [name, setName] = useState('');
  const [auth] = useAuth();
  const [selected, setSelected] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [episode, setEpisode] = useState('');
  const [updateEpisode, setUpdateEpisode] = useState('');

  const create_episode = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:1000/api/v1/episode/add-episodes',
        { name , episode },
        {
          headers: {
            'auth-token': auth.token,
          },
        }
      );
      get_episodes();
      // Handle the response data as needed
    } catch (err) {
      console.log(err);
      alert('generses already exists');
    }
  };

  const get_episodes = async () => {
    try {
      const { data } = await axios.get('http://localhost:1000/api/v1/episode/get-episodes');
      setEpisodes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_episodes();
  }, []);

  const delete_episode = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:1000/api/v1/episode/delete-episodes/${id}`, {
        headers: {
          'auth-token': auth.token,
        },
      });
      console.log(`${data} gernses is deleted`);
      get_episodes();
    } catch (err) {
      console.log(err);
    }
  };

  const update_episode = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `http://localhost:1000/api/v1/episode/update-episodes/${selected._id}`,
        { name: updateName,episode:updateEpisode },
        {
          headers: {
            'auth-token': auth.token,
          },
        }
      );
      console.log(`${data.name} gernse is updated`);
      get_episodes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <form onSubmit={create_episode}>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Name</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter Episode Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='exampleInputEmail1'>Episode</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter Episode Iframe'
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
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
              <th scope='col'>Episode</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((c, index) => (
              <tr key={c.id}>
                <th scope='row'>{index + 1}</th>
                <td>{c.name}</td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={() => delete_episode(c._id)}>
                    DELETE
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      setUpdateName(c.name);
                      setUpdateEpisode(c.episode);
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
                <form onSubmit={update_episode}>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Update Episode</label>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputEmail1'
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      aria-describedby='emailHelp'
                      placeholder='Enter update Episode Name'
                    />
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputEmail1'
                      value={updateEpisode}
                      onChange={(e) => setUpdateEpisode(e.target.value)}
                      aria-describedby='emailHelp'
                      placeholder='Enter update Episode'
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

export default AddEpisode;
