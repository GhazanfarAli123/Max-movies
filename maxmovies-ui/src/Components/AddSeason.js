import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { useAuth } from '../Context/auth';
const AddSeason = () => {
    const [name, setName] = useState('');
    const [season, setSeason] = useState([]);
    const [episode, setEpisode] = useState([])
    const [updateName, setUpdateName] = useState("")
    const [selected, setSelected] = useState("")
    const [auth] = useAuth();
    const [episodes, setEpisodes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:1000/api/v1/season/create-season',
                { name, episodes: selectedCategories }, // Use selectedCategories
                {
                    headers: {
                        'auth-token': auth.token,
                    },
                }
            );
            console.log('Season created:', data);
            // Clear the form after successful submission (optional)
            setName('');
            setSelectedCategories([]);
        } catch (err) {
            console.log('Error creating season:', err);
        }
    };


    const get_season = async (e) => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/season/get-season")
            setSeason(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        get_season()
    }, [])


    const handelDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:1000/api/v1/season/delete-season/${id}`, {
                headers: {
                    'auth-token': auth.token
                }
            })
            console.log(`${data.name} country is deleted`)
            get_season()
        } catch (err) {
            console.log(err)
        }
    }
    // const handelUpdate = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const { data } = await axios.put(`http://localhost:1000/api/v1/country/update-country/${selected._id}`, { name: updateName }, {
    //             headers: {
    //                 'auth-token': auth.token
    //             }
    //         })
    //         console.log(`${data.name} country is uddated`)
    //         getCategory()
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleCheckboxChange = (event) => {
        const categoryId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
        } else {
            setSelectedCategories((prevSelected) =>
                prevSelected.filter((id) => id !== categoryId)
            );
        }
    };

    const fetchEpisodes = async () => {
        try {
            const response = await axios.get('http://localhost:1000/api/v1/episode/get-episodes');
            setEpisodes(response.data);
        } catch (error) {
            console.error('Error fetching episodes:', error);
        }
    };

    useEffect(() => {
        fetchEpisodes();
    }, []);


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter episodes based on the search query
    const filteredEpisodes = episodes.filter((episode) =>
        episode.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <AdminNavbar />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Enter Season</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Season Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <div className='col-6 season-select'>
                            <ul className='seasoncheck'>
                                <input
                                    type='text'
                                    placeholder='Search Episodes'
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                {filteredEpisodes.map((episode) => (
                                    <li key={episode._id}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                name='category'
                                                value={episode._id}
                                                onChange={handleCheckboxChange}
                                                checked={selectedCategories.includes(episode._id)}
                                            />{' '}
                                            {episode.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Seasons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {season.map((c, index) => (
                            <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{c.name}</td>
                                    <td>
                                    <button type="button" class="btn btn-danger mx-2" onClick={() => handelDelete(c._id)}>Delete</button>
                                        </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AddSeason