import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { useAuth } from '../Context/auth';

const AddGerneses = () => {
  const [gerneses, setGerneses] = useState([]);
  const [name, setName] = useState('');
  const [auth] = useAuth();
  const [selected, setSelected] = useState('');
  const [updateName, setUpdateName] = useState('');

  const create_gerneses = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:1000/api/v1/gernse/create-gernse',
        { name },
        {
          headers: {
            'auth-token': auth.token,
          },
        }
      );
      get_gernese();
      // Handle the response data as needed
    } catch (err) {
      console.log(err);
      alert('generses already exists');
    }
  };

  const get_gernese = async () => {
    try {
      const { data } = await axios.get('http://localhost:1000/api/v1/gernse/get-gernse');
      setGerneses(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_gernese();
  }, []);

  const delete_gernses = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:1000/api/v1/gernse/delete-gernse/${id}`, {
        headers: {
          'auth-token': auth.token,
        },
      });
      console.log(`${data} gernses is deleted`);
      get_gernese();
    } catch (err) {
      console.log(err);
    }
  };

  const update_gernse = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `http://localhost:1000/api/v1/gernse/update-gernse/${selected._id}`,
        { name: updateName },
        {
          headers: {
            'auth-token': auth.token,
          },
        }
      );
      console.log(`${data.name} gernse is updated`);
      get_gernese();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <form onSubmit={create_gerneses}>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email Gernse</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter Gerneses'
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            {gerneses.map((c, index) => (
              <tr key={c.id}>
                <th scope='row'>{index + 1}</th>
                <td>{c.name}</td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={() => delete_gernses(c._id)}>
                    DELETE
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      setUpdateName(c.name);
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

export default AddGerneses;
