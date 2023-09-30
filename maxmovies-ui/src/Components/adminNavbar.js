
import React, { useState } from "react"
import '../assets/style.css'

function adminNavbar({ categoryId }) {

  const [search, setSearch] = useState('')

  const searchBtn = async(e) =>{
    e.preventDefault()
     const url = `/admin/dashboard/search/${search}/${categoryId}`;
     console.log(url)
     window.open(url)
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-category">Add Category</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-episode">Add Episode</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-gerneses">Add Gernse</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-country">Add Country</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-season">Add Season</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-seasons">Add Seasons</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-movies">Add movies</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin/dashboard/all-movies">All movies</a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button class="btn btn-outline-success my-2 my-sm-0" onClick={searchBtn} type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default adminNavbar;