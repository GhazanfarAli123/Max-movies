import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientNavBar from '../Components/ClientNavBar';
import Pr from "../Components/pr"

const CategoryPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState([]);
    const [categoryid, setCategoryid] = useState([]);
    const [catregoryBySlug, setCatregoryBySlug] = useState('');

    const getCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/category/get-category")
            setCategoryid(data)
        } catch (err) {
            console.log(err);
        }
    }

    const getCategoryBySlug = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/category/get-category/${slug}`)
            setCatregoryBySlug(data[0]._id)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCategoryBySlug();
        getCategory();
    }, [slug]); // Include slug as a dependency.

    useEffect(() => {
        if (catregoryBySlug) {
            // Make the API request only when catregoryBySlug is available
            getDataCategory(catregoryBySlug);
        }
    }, [catregoryBySlug]);

    const getDataCategory = async (categoryId) => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seamovies/${categoryId}`);
            setCategoryData(data);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(categoryData)
    const category = categoryid.find((cat) => cat.slug === slug);
    if (!category) {
        navigate('/404');
    }

    if (categoryData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ClientNavBar />
            <div className='container'>
                <div className='row'>
                    {categoryData.map((e) =>(
                        <div className='col-3' key={e._id}>
                            {e.name}
                        </div>
                    ))}
                    <Pr categoryData={categoryData} />
                </div>
            </div>
        </>
    );
}

export default CategoryPage;
