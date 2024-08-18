import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import { useNavigate } from 'react-router';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, setCart ,removeFromCart } = useCart();
    const [auth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Calculate total price of cart items
    const totalPrice = () => {
        try {
            return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            });
        } catch (error) {
            console.log(error);
            return 0;
        }
    };

    // Remove item from cart
    // const removeItemCart = (pid) => {
    //     try {
    //         const updatedCart = cart.map(item => 
    //             item._id === pid 
    //             ? { ...item, quantity: (item.quantity || 1) - 1 } 
    //             : item
    //         ).filter(item => item.quantity > 0);
            
    //         setCart(updatedCart);
    //         localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // Fetch Braintree client token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Handle payment processing
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });

            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {auth?.token && `Hello ${auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart.length ? 
                                `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart ${auth?.token ? "" : "Please login to checkout"}` 
                                : 
                                "Your cart is empty"}
                        </h4>
                    </div>
                </div>

                {cart.length > 0 && (
                    <div className='row'>
                        <div className='col-md-6'>
                            {cart.map((p) => (
                                <div key={p._id} className="container-card">
                                    <div className="card">
                                        <div className="top-div">
                                            <div className="border">
                                                <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                            </div>
                                            <span>{p.price} Rs</span>
                                        </div>
                                        <div className="bottom-div">
                                            <h3>{p.name}</h3>
                                            <span>Quantity: {p.quantity || 1}</span>
                                        </div>
                                        <div className="last-section">
                                            <div className="last-div">
                                                <Link to={`/product/${p.slug}`}>
                                                <i className="fa-solid fa-icon2 fa-comment-dots"></i>
                                                </Link>
                                            </div>
                                            <div className="buttons">
                                                <button className='btn btn-danger' onClick={() => removeFromCart(p._id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='col-md-6'>
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>
                                        Update Address
                                    </button>
                                </div>
                            ) : (
                                <div className='mb-3'>
                                    {auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>
                                            Update Address
                                        </button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/login", { state: "/cart" })}>
                                            Please login to checkout
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {clientToken && auth?.token && cart.length ? (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={instance => setInstance(instance)}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CartPage;
