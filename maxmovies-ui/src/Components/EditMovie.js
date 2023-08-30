import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/auth'
import { useParams } from 'react-router-dom'
import AdminNavbar from './adminNavbar'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditMovie = () => {
    const [movie, setMovie] = useState([]); // Initialize with an empty array
    const [auth] = useAuth("")
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]); // Updated variable name



    const getMovieData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMoviis/${id}`);
            setMovie(data);
            setSelectedDate(new Date(data.dateoflaunch));
            setSelectedCategories(data.category);
        } catch (err) {
            console.log(err);
        }
    }

    const getCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/category/get-category")
            setCategories(data); // Update categories state
        } catch (err) {
            console.log(err);
        }
    }
    const handleCheckboxChange = (event) => {
        const categoryId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedCategories(prevSelected => [...prevSelected, categoryId]);
        } else {
            setSelectedCategories(prevSelected => prevSelected.filter(id => id !== categoryId));
        }
    };



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
                            {categories.map((cat) => (
                                <label key={cat._id}>
                                    <input
                                        type='checkbox'
                                        value={cat._id}
                                        onChange={handleCheckboxChange}
                                        checked={selectedCategories.includes(cat._id)}
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
