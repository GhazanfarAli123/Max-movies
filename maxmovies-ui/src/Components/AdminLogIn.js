import React, { useState } from 'react';
import AdminNavbar from './adminNavbar';
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1000/api/v1/auth/login', {
        email,
        password,
      });
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      });
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed. Invalid email or password.');
    }
  };

  return (
    <>
      <AdminNavbar />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default AdminLogIn;
