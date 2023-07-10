import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage.js";
import { AdminDashboard } from './Pages/AdminDashboard.js';
import AdminLogIn from './Components/AdminLogIn.js';
import AdminRoute from './Routes/AdminRoutes.js';
import AddCategory from './Components/AddCategory.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="admin" element={<AdminLogIn />} />
        <Route path="admin" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/add-category" element={<AddCategory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
