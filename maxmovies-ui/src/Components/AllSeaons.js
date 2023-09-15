import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './adminNavbar';

const AllSeaons = () => {
  const [season, setSeason] = useState([]);

  const getseason = async () => {
    try {
      const { data } = await axios.get('http://localhost:1000/api/v1/seamov/get-seaMovis/Season');
      setSeason(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getseason();
  }, []);

  return (
    <>
      <AdminNavbar />
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
                <button className="danger" onClick={() => deleteMov(m._id)}>
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
