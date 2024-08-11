import React, { useState } from 'react'
import Layout from './../../components/layout/layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import "../../styles/authStyles.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password",
                { email, answer, newPassword });
            console.log(res.data.success);
            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 5000 })
                navigate("/login")
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
        <Layout title={"forgot-password"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Reset Password</h4>
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
                            type="text"
                            value={answer}
                            class="form-control"
                            onChange={(e) => setAnswer(e.target.value)}
                            id="exampleInputPassword1"
                            placeholder="your favourite bird?" />
                    </div>
                    <div class="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            class="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            id="exampleInputPassword1"
                            placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword