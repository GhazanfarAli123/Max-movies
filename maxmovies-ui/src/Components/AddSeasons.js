import React, { useEffect, useState, useCallback } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../Context/auth';

const AddSeaons = () => {
  const [name, setName] = useState("")
  const [category, setCategory] = useState([]);
  const [season, setSeason] = useState([]);
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [auth] = useAuth();
  const [movieQuery, setMovieQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState([]);
  const [selectedSeasonQuery, setSelectedSeasonQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gerneses, setGerneses] = useState([]);
  const [selectedGerneses, setSelectedGerneses] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [country, setCountry] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [gernseSearchQuery, setGernseSearchQuery] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState("")
  const [imdb, setImdb] = useState("")



  const getCategory = async () => {
    const { data } = await axios.get('http://localhost:1000/api/v1/category/get-category');
    setCategory(data);
  };
  const getCounty = async () => {
    const { data } = await axios.get('http://localhost:1000/api/v1/country/get-country');
    setCountry(data);
  };

  const getGerneses = async () => {
    const { data } = await axios.get("http://localhost:1000/api/v1/gernse/get-gernse")
    setGerneses(data);
  }

  const getSeasons = async () => {
    const { data } = await axios.get("http://localhost:1000/api/v1/season/get-season")
    setSeason(data);
  }

  const getMovie = async () => {
    const { data } = await axios.get("http://localhost:1000/api/v1/movie/get-movies")
    setMovie(data);
  }



  const handleCheckboxChangeGen = (event) => {
    const genreId = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedGerneses((prevSelected) => [...prevSelected, genreId]);
    } else {
      setSelectedGerneses((prevSelected) =>
        prevSelected.filter((id) => id !== genreId)
      );
    }
  };
  
  

  const handleCheckboxChangefCat = (event) => {
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
  const handleCheckboxforSeasons = (event) => {
    const seasonId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedSeason((prevSelected) => [...prevSelected, seasonId]);
    } else {
      setSelectedSeason((prevSelected) =>
        prevSelected.filter((id) => id !== seasonId)
      );
    }
  };


  const handelCreate = async (e) => {
    try {
      const seamov = new FormData();
      seamov.append("name", name);
      seamov.append("season", selectedSeason); // Use selectedSeason instead of season
      seamov.append("gerneses", selectedGerneses); // Use selectedGerneses instead of gerneses
      seamov.append("dateoflaunch", startDate);
      seamov.append("countries", selectedCountry); // Use selectedCountry instead of country
      seamov.append("imdb", imdb);
      seamov.append("category", selectedCategories); // Use selectedCategories instead of category
      seamov.append("description", desc);
      seamov.append("tags", tagData);
      seamov.append("photo", photo);
  
      const { data } = await axios.post(
        "http://localhost:1000/api/v1/seamov/create-seamov",
        seamov,
        {
          headers: {
            "auth-token": auth.token,
          },
        }
      );
      alert(`${name} is added`)
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleCheckboxChangefCountry = (event) => {
    const countryId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCountry((prevSelected) => [...prevSelected, countryId]);
    } else {
      setSelectedCountry((prevSelected) =>
        prevSelected.filter((id) => id !== countryId)
      );
    }
  };

  useEffect(() => {
    getCategory();
    getGerneses();
    getCounty();
    getSeasons();
    getMovie();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleGernseSearch = (event) => {
    setGernseSearchQuery(event.target.value);
  };

  const handleSeasonSearch = (event) => {
    setSelectedSeasonQuery(event.target.value);
  };
  const handleMoviesSearch = (event) => {
    setMovieQuery(event.target.value);
  };

  const filteredCountries = country.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredGerneses = gerneses.filter((genre) =>
    genre.name && genre.name.toLowerCase().includes(gernseSearchQuery.toLowerCase())
  );

  const filteredCategory = category.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSeasons = season.filter((sea) =>
    sea.name && sea.name.toLowerCase().includes(selectedSeasonQuery.toLowerCase())
  );

  const removeTagData = (indexToRemove) => {
    setTagData(tagData.filter((_, index) => index !== indexToRemove));
  };
  

  const addTagData = (event) => {
    const newTags = event.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    if (newTags.length > 0) {
      setTagData([...tagData, ...newTags]);
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
        const MAX_WIDTH = 800;
        const scaleFactor = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleFactor;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          setPhoto(resizedFile);
        }, 'image/webp', 0.3); // Compression quality for WebP (0.1 = 10%)
      };
    };
  };
  console.log(selectedCountry)



  return (
    <div className='bg-dark text-white'>
      <AdminNavbar />
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <h2>Add Date</h2>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            <h1>Add category</h1>
            <ul>
              {filteredCategory.map((c) => (
                <li key={c._id}>
                  <label>
                    <input
                      type='checkbox'
                      name='category'
                      value={c._id}
                      onChange={handleCheckboxChangefCat}
                      checked={selectedCategories.includes(c._id)}
                    />{' '}
                    {c.name}
                  </label>
                </li>
              ))}
            </ul>
            <h1>Add Gerneses</h1>
            <ul>
              <input
                type='text'
                placeholder='Search Genres'
                value={gernseSearchQuery}
                onChange={handleGernseSearch}
              />
              {filteredGerneses.map((c) => (
                <li key={c._id}>
                  <label>
                    <input
                      type='checkbox'
                      name='category'
                      value={c._id}
                      onChange={handleCheckboxChangeGen}
                      checked={selectedGerneses.includes(c._id)}
                    />{' '}
                    {c.name}
                  </label>
                </li>
              ))}
            </ul>

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
            <div className='countries'>
              <ul>
                {/* <input
                type='text'
                placeholder='Search Genres'
                value={gernseSearchQuery}
                onChange={handleGernseSearch}
              /> */}
                <h1>Add country</h1>
                {country.map((c) => (
                  <li key={c._id}>
                    <label>
                      <input
                        type='checkbox'
                        name='country'
                        value={c._id}
                        onChange={handleCheckboxChangefCountry}
                        checked={selectedCountry.includes(c._id)}
                      />{' '}
                      {c.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='col-6'>
            <div className='seaMovName'>
              <h1>Enter Movie and Season Name</h1>
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
            <div className='seaMovDesc'>
              <h2>Enter Movie and Season Description</h2>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Season Name"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
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
              <div>{photo ? photo.name : 'Upload Image'}</div>
            )}
            <input
              type='file'
              name='photo'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
          <div className='col-3'>
            <div className='seasons'>
              <h2>Add Season</h2>
              <input
                type='text'
                placeholder='Search Genres'
                value={selectedSeasonQuery}
                onChange={handleSeasonSearch}
              />
              {filteredSeasons.map((c) => (
                <li key={c._id}>
                  <label>
                    <input
                      type='checkbox'
                      name='season'
                      value={c._id}
                      onChange={handleCheckboxforSeasons}
                      checked={selectedSeason.includes(c._id)}
                    />{' '}
                    {c.name}
                  </label>
                </li>
              ))}
            </div>
            <input
              type='number'
              max="10"
              value={imdb}
              onChange={(e) => setImdb(e.target.value)}
                />
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(selectedSeason, null, 2)}</pre> */}
      <button className='btn btn-primary' onClick={handelCreate}>Add SeaMov</button>
    </div>
  );
};

export default AddSeaons;
