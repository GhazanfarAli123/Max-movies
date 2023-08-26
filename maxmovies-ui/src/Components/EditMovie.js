import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/auth'
import { useParams } from 'react-router-dom'
import AdminNavbar from './adminNavbar'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditMovie = () => {
    const [movie, setMovie] = useState([])
    const [auth] = useAuth("")
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [category,setCategory] = useState([])


    const getMovieData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMovis/${id}`)
            setMovie(data)
            setSelectedDate(new Date(data.dateoflaunch));  // Set the selectedDate after movie is fetched
        } catch (err) {
            console.log(err)
        }
    }

    const getCategory = async (e) => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/category/get-category")
            setCategory(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMovieData();
        getCategory();
    }, [])

    return (
        <>
            <AdminNavbar />
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='datePicker'>
                            <h1>Edit Date</h1>
                            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                        </div>
                        <div className='category-picker'>
                            <h1>Edit Category</h1>
                            {category.map((cat) => (
                                <label key={cat._id}>
                                        <input
                                        type='checkbox'
                                        value={cat.name}
                                        checked={movie.category.includes(cat._id)}  // Check if the category is in the movie's categories
                                    />                                    
                                    {cat.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditMovie;
