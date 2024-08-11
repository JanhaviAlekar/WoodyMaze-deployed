import React, { useState, useEffect } from 'react'
import Layout from './../../components/layout/layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuth } from '../../context/auth';
const Profile = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    //get user dats
    useEffect(() => {
        const { email, name, address, phone } = auth?.user;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);

    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile",
                { name, email, password, phone, address });

            setAuth({ ...auth, user: data?.updatedUser });
            let ls = localStorage.getItem('auth');
            ls = JSON.parse(ls);
            ls.user = data.updatedUser;
            localStorage.setItem('auth', JSON.stringify(ls));
            toast.success("Profile Updated Successfully");

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }
    return (
        <Layout title={"update"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Update</h4>
                    <div class="mb-3">
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            class="form-control"
                            id="exampleInputName"
                            placeholder="Enter Name"

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
                            disabled
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
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            class="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Phone"

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
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </Layout>
    )
}

export default Profile