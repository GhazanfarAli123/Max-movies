import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/auth'
import { useParams } from 'react-router-dom'
import AdminNavbar from './adminNavbar'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditMovie = () => {
    const [movies, setMovies] = useState([]); // Initialize with an empty array
    const [auth] = useAuth("")
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]); // Updated variable name
    const [gerneses, setGerneses] = useState([])
    const [selectedGerneses, setSelectedGerneses] = useState([])
    const [selectedMovies, setSelectedMovies] = useState([])
    const [tagData, setTagData] = useState([]);
    const [selectedGernesesQuery, setSelectedGernesesQuery] = useState("");
    const [selectedMoviesQuery, setSelectedMoviesQuery] = useState("");
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")


    const getMovieData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/seamov/get-seaMoviis/${id}`);
            console.log("Data received from API:", data);
            console.log("Genre IDs from API:", data.gerneses);

            setSelectedDate(new Date(data.dateoflaunch));
            setSelectedCategories(data.category);
            setSelectedGerneses(data.gerneses);
            setTagData(data.tags);
            setName(data.name);
            setDesc(data.description);
            setSelectedMovies(data.movie);
        } catch (err) {
            console.log(err);
        }
    };

    const get_gernese = async () => {
        try {
            const { data } = await axios.get('http://localhost:1000/api/v1/gernse/get-gernse');
            setGerneses(data);
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    };

    const getCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/category/get-category")
            setCategories(data); // Update categories state
        } catch (err) {
            console.log(err);
        }
    }
    const getMovie = async () => {
        const { data } = await axios.get("http://localhost:1000/api/v1/movie/get-movies")
        setMovies(data);
    }

    const filteredGerneses = gerneses.filter((gerneses) =>
        gerneses.name && gerneses.name.toLowerCase().includes(selectedGernesesQuery.toLowerCase())
    );
    const filteredMovies = movies.filter((movie) =>
        movie.name && movie.name.toLowerCase().includes(selectedMoviesQuery.toLowerCase())
    );

    const handleCheckboxChangeCat = (event) => {
        const categoryId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedCategories(prevSelected => [...prevSelected, categoryId]);
        } else {
            setSelectedCategories(prevSelected => prevSelected.filter(id => id !== categoryId));
        }
    };


    const handleCheckboxChangeMov = (event) => {
        const movId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedMovies(prevSelected => [...prevSelected, movId]);
        } else {
            setSelectedMovies(prevSelected => prevSelected.filter(id => id !== movId));
        }
    };

    const handleCheckboxChangeGen = (event) => {
        const movId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedGerneses(prevSelected => [...prevSelected, movId]);
        } else {
            setSelectedGerneses(prevSelected => prevSelected.filter(id => id !== movId));
        }
    };

    const seamovUpdate = async() =>{
        try{
            const seamov = new FormData();
            seamov.append("name", name);
            seamov.append("movie", selectedMovies); // Use selectedSeason instead of season
            seamov.append("gerneses", selectedGerneses); // Use selectedGerneses instead of gerneses
            seamov.append("dateoflaunch", selectedDate);
            seamov.append("category", selectedCategories); // Use selectedCategories instead of category
            seamov.append("description", desc);
            seamov.append("tags", tagData);
            seamov.append("photo", photo);
            const { data } = await axios.put(
                `http://localhost:1000/api/v1/seamov/update-seamov/${id}`,
                seamov,
                {
                  headers: {
                    "auth-token": auth.token,
                  },
                }
              );
              console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getMovieData();
        getCategory();
        get_gernese();
        getMovie();
    }, [])

    const handelsearchforgerneses = (event) => {
        setSelectedGernesesQuery(event.target.value);
    };
    const handelsearchforMovies = (event) => {
        setSelectedMoviesQuery(event.target.value);
    };
    const removeTagData = (indexToRemove) => {
        setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
    };

    const addTagData = (event) => {
        if (event.target.value !== '') {
            setTagData([...tagData, event.target.value]);
            event.target.value = '';
        }
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
          resizeImage(selectedFile);
        }
      };
    
      const resizeImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
    
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800; // Maximum width after resizing
            const scaleFactor = MAX_WIDTH / img.width;
    
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleFactor;
    
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
            canvas.toBlob((blob) => {
              const resizedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
              setPhoto(resizedFile);
            }, 'image/jpeg', 0.7); // Compression quality (0.7 = 70%)
          };
        };
      };


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
                                        onChange={handleCheckboxChangeCat}
                                        checked={selectedCategories.includes(cat._id)}
                                    />
                                    {cat.name}
                                </label>
                            ))}
                        </div>
                        <div className='gerneses-picker'>
                            <h1>Edit Genres</h1>
                            <input
                                type='text'
                                placeholder='Search Genres'
                                value={selectedGernesesQuery}
                                onChange={handelsearchforgerneses}
                            />
                            {filteredGerneses.map((gen) => (
                                <label key={gen._id}>
                                <input
                                    type='checkbox'
                                    value={gen._id}
                                    onChange={handleCheckboxChangeGen}
                                    checked={selectedGerneses.includes(gen._id)} // Check if the genre ID is in selectedGerneses
                                />
                                {gen.name}
                                </label>
                            ))}
                            </div>
                        <h1>Enter Tags</h1>
                        <div className="tag-input">
                            <ul className="tags">
                                {tagData.map((tag, index) => (
                                    <li key={index} className="tag">
                                        <span className="tag-title">{tag}</span>
                                        <span
                                            className="tag-close-icon"
                                            onClick={() => removeTagData(index)}
                                        >
                                            x
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="text"
                                onKeyUp={event => (event.key === 'Enter' ? addTagData(event) : null)}
                                placeholder="Press enter to add a tag"
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='name'>
                            <h1>Enter Name</h1>
                            <input type="text" width="100%" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='desc'>
                            <h1>Enter Description</h1>
                            <textarea rows="10" cols="70" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className='photo'>
                        {photo ? (
                <div className='image'>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt='product_image'
                    height='200px'
                    className='img img-responsive'
                  />
                </div>
              ) : (
                <div>
                <img height={'200px'}  src={`http://localhost:1000/api/v1/seamov/sea-photo/${id}`} />
                </div>
              )}
              <input
                type='file'
                name='photo'
                accept='image/*'
                onChange={handleFileChange}
              />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='movie'>
                            <h1>Edit Movie</h1>
                            <input
                                type='text'
                                placeholder='Search Genres'
                                value={selectedMoviesQuery}
                                onChange={handelsearchforMovies}
                            />
                            {filteredMovies.map((mov) => (
                                <label key={mov._id}>
                                    <input
                                        type='checkbox'
                                        value={mov._id}
                                        onChange={handleCheckboxChangeMov}
                                        checked={selectedMovies.includes(mov._id)}
                                    />
                                    {mov.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={seamovUpdate}>Update</button>
            </div>
        </>
    )
}

export default EditMovie;
