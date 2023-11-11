import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from "./Pages/HomePage.js";
import { AdminDashboard } from './Pages/AdminDashboard.js';
import AdminLogIn from './Components/AdminLogIn.js';
import AdminRoute from './Routes/AdminRoutes.js';
import AddCategory from './Components/AddCategory.js';
import AddGerneses from './Components/AddGerneses.js';
import AddCountry from './Components/AddCountry.js';
import AddEpisode from './Components/AddEpisode.js';
import AddSeason from './Components/AddSeason.js';
import AdminSignUp from './Components/AdminSignUp';
import Addmovies from './Components/Addmovies';
import AddSeaons from './Components/AddSeasons';
import AllMovies from './Components/AllMovies';
import EditMovie from './Components/EditMovie';
import AllSeaons from './Components/AllSeaons';
import EditSeason from './Components/EditSeason';
import SearchResultAdmin from './Components/SearchResutlAdmin';
import SearchResult from './Components/SearchResult';
import CategoryPage from './Pages/CategoryPage';
import Error404 from './Components/404';
import CountryPage from './Pages/CountryPage';
import GernesesPage from './Pages/GernesesPage';
import MoviePage from './Pages/MoviePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/search/:keyword" element={<SearchResult />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/gerneses/:slug" element={<GernesesPage />} />
        <Route path="/country/:slug" element={<CountryPage />} />
        <Route path="/:category/:slug" element={<MoviePage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/signup" element={<AdminSignUp />} />
          <Route path="admin" element={<AdminLogIn />} />
        <Route path="admin" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/search/:keyword/:category" element={<SearchResultAdmin />} />
          <Route path="/admin/dashboard/add-category" element={<AddCategory />} />
          <Route path="/admin/dashboard/add-gerneses" element={<AddGerneses />} />
          <Route path="/admin/dashboard/add-country" element={<AddCountry />} />
          <Route path="/admin/dashboard/add-episode" element={<AddEpisode />} />
          <Route path="/admin/dashboard/add-season" element={<AddSeason />} />
          <Route path="/admin/dashboard/add-seasons" element={<AddSeaons />} />
          <Route path="/admin/dashboard/add-movies" element={<Addmovies />} />
          <Route path="/admin/dashboard/all-movies" element={<AllMovies />} />
          <Route path="/admin/dashboard/all-seasons" element={<AllSeaons />} />
          <Route path="/admin/dashboard/edit-movie/:id" element={<EditMovie />} />
          <Route path="/admin/dashboard/edit-season/:id" element={<EditSeason />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
