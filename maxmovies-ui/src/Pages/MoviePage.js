import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientNavBar from '../Components/ClientNavBar';
import Pr from "../Components/pr"

const MoviePage = () => {
    const { slug } = useParams();
    const [Movdata, setMovData] = useState([])
    const [category, setCategory] = useState([])
    const [categoryEpispodes, setCategoryEisodes] = useState([])
    const [episode, setEpisodes] = useState('')
    const [episodeData, setEpisodeData] = useState([])
    const [showEpisode, setShowEpisode] = useState('')
    const [movie,setMovie] = useState('')

    const getMovSeason = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMov/${slug}`)
            setMovData(data)
            setCategory(data.season)
            setShowEpisode(data.movie)
            setMovie(data.movie)
        } catch (err) {
            console.log(err)
        }
    }

    const getSeason = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/season/get-season/${category}`)
            setCategoryEisodes(data)
            setEpisodes(data[0].episodes)
        } catch (err) {
            console.log(err)
        }
    }

    const getEpisodes = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/episode/get-episodes/${episode}`)
            setEpisodeData(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMovSeason()
        getSeason()
        getEpisodes()
    }, [])

    const handleDivClick = (episodeName) => {
        setShowEpisode(episodeName);
    };

    return (
        <>
            <ClientNavBar />

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='screen' style={{ height: "500px" }}>
                        <div dangerouslySetInnerHTML={{ __html: showEpisode }} />
                        </div>
                    </div>
                    {movie ? (
                       <></>
                    ) : (
                        episodeData.map((e) => (
                            <div key={e.id} className='col-lg-3' onClick={() => handleDivClick(e.episode)}>
                                {e.name}
                            </div>
                        ))
                    )}

                </div>
            </div>

        </>
    );
}

export default MoviePage;
