import React, { useState } from 'react'
import Layout from './../../components/layout/layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import "../../styles/authStyles.css";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register",
                { name, email, password, phone, address, answer });
            console.log(res.data.success);
            if (res.data.success) {

                toast.success(res.data.message)
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
        <Layout title={"register"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>REGISTER NOW</h4>
                    <div class="mb-3">
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            class="form-control"
                            id="exampleInputName"
                            placeholder="Enter Name"
                            required
                        />
                    </div>
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            class="form-control"
                            id="exampleInputAddress"
                            placeholder="Enter Address"
                            required />
                    </div>
                    <div class="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            class="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Phone"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            class="form-control"
                            id="exampleInputPhone"
                            placeholder="What is your favourite bird? "
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
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register