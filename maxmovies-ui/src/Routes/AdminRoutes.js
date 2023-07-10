import { useEffect , useState } from "react";
import { useAuth } from "../Context/auth";
import axios from 'axios'
import { Outlet } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import { AdminDashboard } from "../Pages/AdminDashboard";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get("http://localhost:1000/api/v1/auth/admin-auth", {
                    headers: {
                        "auth-token": auth.token
                    }
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (err) {
                setOk(false);
                console.log(err);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <AdminDashboard />;
}
