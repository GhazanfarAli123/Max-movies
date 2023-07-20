import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage.js";
import { AdminDashboard } from './Pages/AdminDashboard.js';
import AdminLogIn from './Components/AdminLogIn.js';
import AdminRoute from './Routes/AdminRoutes.js';
import AddCategory from './Components/AddCategory.js';
import AddGerneses from './Components/AddGerneses.js';
import AddCountry from './Components/AddCountry.js';
import AddMovie from './Components/AddMovie.js';
import AddEpisode from './Components/AddEpisode.js';
import AddSeason from './Components/AddSeason.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="admin" element={<AdminLogIn />} />
        <Route path="admin" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/add-category" element={<AddCategory />} />
          <Route path="/admin/dashboard/add-gerneses" element={<AddGerneses />} />
          <Route path="/admin/dashboard/add-country" element={<AddCountry />} />
          <Route path="/admin/dashboard/add-movie" element={<AddMovie />} />
          <Route path="/admin/dashboard/add-episode" element={<AddEpisode />} />
          <Route path="/admin/dashboard/add-season" element={<AddSeason />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
