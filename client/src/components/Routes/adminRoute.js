import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router";
import axios from "axios";
import Spinner from "../spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const [isMounted, setIsMounted] = useState(true); // Add a flag to track whether the component is mounted

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a new cancel token for each request

        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/admin-auth', {
                    cancelToken: source.token // Use the cancel token in the request
                });
                if (isMounted) { // Check if the component is still mounted before updating state
                    if (res.data.ok) {
                        setOk(true)
                    } else {
                        setOk(false)
                    }
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    // Request was cancelled, do nothing
                } else {
                    // Handle other errors as needed
                }
            }
        }
        if (auth?.token) authCheck();

        return () => {
            setIsMounted(false); // Update the isMounted flag when the component unmounts
            source.cancel("Request cancelled on unmount"); // Cancel any pending requests
        };
    }, [auth?.token, isMounted]);

    return ok ? <Outlet /> : <Spinner path="" />;
}
