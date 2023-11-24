import { useEffect, useState } from "react";
import { useAuth } from "../Context/auth";
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import { AdminDashboard } from "../Pages/AdminDashboard";

export default function AdminRoute() {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get("http://localhost:1000/api/v1/auth/admin-auth", {
                    headers: {
                        "auth-token": auth.token
                    }
                });

                if (res.data.ok) {
                    setLoading(false);
                } else {
                    setLoading(false);
                    setAuth({}); // Clear authentication to prevent further unauthorized requests
                }
            } catch (err) {
                setLoading(false);
                console.log(err);
                setAuth({}); // Clear authentication in case of an error
            }
        };

        if (auth.token) {
            authCheck();
        } else {
            setLoading(false);
        }
    }, [auth.token, setAuth]);

    if (loading) {
        // You may want to show a loading spinner or some indication while checking authentication
        return <div>Loading...</div>;
    }

    if (!auth.token) {
        // Redirect to the home page if there is no auth token
        navigate('/admin');
        return null; // Return null to prevent rendering anything else while redirecting
    }

    return <AdminDashboard />;
}
