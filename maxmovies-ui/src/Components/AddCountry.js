import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { useAuth } from '../Context/auth';

const AddCountry = () => {
    // const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [updateName, setUpdateName] = useState("")
    const [selected, setSelected] = useState("")
    const [auth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:1000/api/v1/country/create-country',
                { name },
                {
                    headers: {
                        'auth-token': auth.token,
                    },
                }
            );
            console.log(`country ${data.name} added`);
            getCategory()
        } catch (err) {
            console.log(err);
        }
    };

    const getCategory = async (e) => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/country/get-country")
            setCategories(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCategory()
    }, [])


    const handelDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:1000/api/v1/country/delete-country/${id}`, {
                headers: {
                    'auth-token': auth.token
                }
            })
            console.log(`${data.name} country is deleted`)
            getCategory()
        } catch (err) {
            console.log(err)
        }
    }
    const handelUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:1000/api/v1/country/update-country/${selected._id}`, { name: updateName }, {
                headers: {
                    'auth-token': auth.token
                }
            })
            console.log(`${data.name} country is uddated`)
            getCategory()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className='row'>
                    <div className='col-6'>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Enter Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Country"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Countries</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c, index) => (
                            <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{c.name}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary" onClick={() => { setUpdateName(c.name); setSelected(c) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Edit
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Update country</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form onSubmit={handelUpdate}>
                                                            <div class="form-group">
                                                                <label for="exampleInputEmail1">Update Country</label>
                                                                <input type="text" class="form-control" id="exampleInputEmail1" value={updateName} onChange={(e) => setUpdateName(e.target.value)} s aria-describedby="emailHelp" placeholder="Enter update category" />
                                                            </div>
                                                            <button type="submit" class="btn btn-primary">Submit</button>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-danger mx-2" onClick={() => handelDelete(c._id)}>Delete</button></td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AddCountry;
