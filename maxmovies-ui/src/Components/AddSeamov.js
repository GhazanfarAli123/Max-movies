import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';

const AddSeamov = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [catName, setCatName] = useState('');



  const getCategory = async () => {
    const { data } = await axios.get('http://localhost:1000/api/v1/category/get-category');
    setCategory(data);
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

  useEffect(() => {
    getCategory();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
};

  const filteredCategory = category.filter((cat) =>
  cat.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <ul>
            <label htmlFor="exampleInputEmail1">Enter Season</label>
            <input
                type='text'
                placeholder='Search Episodes'
                value={searchQuery}
                onChange={handleSearch}
            />
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
          </div>
          {/* <pre>{JSON.stringify(selectedCategories, null, 2)}</pre> */}

        </div>
      </div>
    </>
  );
};

export default AddSeamov;
