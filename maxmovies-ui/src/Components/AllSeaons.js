  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import AdminNavbar from './adminNavbar';
  import { useAuth } from '../Context/auth';


  const AllSeaons = () => {
    const [season, setSeason] = useState([]);
    const [auth] = useAuth('')
    const [id,setid] = useState('')

    const getseason = async () => {
      try {
        const { data } = await axios.get('http://localhost:1000/api/v1/seamov/get-seaMovis/Season');
        setSeason(data);
        if (Array.isArray(data) && data.length > 0) {
          setid(data[0]._id);
        } else {
          setid(''); // Set id to an empty string if data is empty or not an array
        }
      } catch (err) {
        console.log(err);
      }
    };

    const deleteSea = async (id) => {
      try {
        const { data } = await axios.delete(`http://localhost:1000/api/v1/seamov/delete-seamov/${id}`, {
          headers: {
            "auth-token": auth.token
          }
        })
        getseason();
        console.log(`${data} is deleted`)
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }
    useEffect(() => {
      getseason();
    }, []);

    return (
      <>
        <AdminNavbar categoryId={id}/>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {season.map((m) => (
                <div className="col-12 allmovie" key={m._id}>
                  <img
                    height={'200px'}
                    src={`http://localhost:1000/api/v1/seamov/sea-photo/${m._id}`}
                    alt={m.name}
                  />
                  <h1>{m.name}</h1>
                  <a href={`/admin/dashboard/edit-season/${m._id}`}>
                    <button>Edit</button>
                  </a>
                  <button className="danger" onClick={() => deleteSea(m._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  export default AllSeaons;
