
import React from "react"
import '../assets/style.css'

function adminNavbar() {
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
          <a class="nav-link active" aria-current="page" href="/admin/dashboard/add-movie">Add Movie</a>
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
    </div>
  </div>
</nav>
   </>
  );
}

export default adminNavbar;