import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientNavBar from '../Components/ClientNavBar';

const CategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState([]);
    const [categoryid, setCategoryid] = useState('');
    const getDataCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seamovies/${id}`);
            setCategoryData(data);
            setCategoryid(data._id)
            console.log(categoryid)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDataCategory();

    }, []);

    // Render the category page content here
    return (
        <>
            <ClientNavBar />
            {/* Render the category page content */}
        </>
    );
}

export default CategoryPage;
