import React, { useState } from 'react'
import Layout from './../../components/layout/layout';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import "../../styles/authStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login",
                { email, password });
            console.log(res.data.success);
            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 4000 })
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        console.log(process.env.REACT_APP_API)
    }
    return (
        <Layout title={"login"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>LOGIN FORM</h4>
                    <div class="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            class="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            type="password"
                            value={password}
                            class="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            id="exampleInputPassword1"
                            placeholder="Password" />
                    </div>
                    <div className='mb-2'>
                        <button type="button" class="btn pl-2 btn-primary" onClick={() => { navigate("/forgot-password") }}>Forgot Password</button>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login;