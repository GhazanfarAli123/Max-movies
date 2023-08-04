import React, { useEffect, useState, useCallback } from 'react';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-autocomplete'; // Correct import

const AddSeamov = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gerneses, setGerneses] = useState([]);
  const [selectedGerneses, setSelectedGerneses] = useState([]);
  const [tagData, setTagData] = useState([]);

  const getCategory = async () => {
    const { data } = await axios.get('http://localhost:1000/api/v1/category/get-category');
    setCategory(data);
  };

  const getGerneses = async () => {
    const { data } = await axios.get("http://localhost:1000/api/v1/gernse/get-gernse")
    setGerneses(data);
  }

  const handleCheckboxChangefGernses = (event) => {
    const gernesesId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedGerneses((prevSelected) => [...prevSelected, gernesesId]);
    } else {
      setSelectedGerneses((prevSelected) =>
        prevSelected.filter((id) => id !== gernesesId)
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

  useEffect(() => {
    getCategory();
    getGerneses();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGerneses = gerneses.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategory = category.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeTagData = (indexToRemove) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };

  const addTagData = (event) => {
    if (event.target.value !== '') {
      setTagData([...tagData, event.target.value]);
      event.target.value = '';
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
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
              {filteredGerneses.map((c) => (
                <li key={c._id}>
                  <label>
                    <input
                      type='checkbox'
                      name='category'
                      value={c._id}
                      onChange={handleCheckboxChangefGernses}
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
          </div>
        </div>
        </div>
      </>
      );
};

      export default AddSeamov;
