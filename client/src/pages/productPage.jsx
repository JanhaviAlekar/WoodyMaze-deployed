import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/prices';
import { ShimmerCard } from '../components/shimmer';
import { useCart } from '../context/cart';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const { cart, addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    // Get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Get total product count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page !== 1) {
            loadMore();
        }
    }, [page]);

    // Load more products
    const loadMore = async () => {
        try {
            setLoadingMore(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoadingMore(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoadingMore(false);
        }
    };


    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filter', { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const renderShimmerCards = () => {
        const shimmerCards = [];
        for (let i = 0; i < 3; i++) {
            shimmerCards.push(<ShimmerCard key={i} />);
        }
        return shimmerCards;
    };

    return (
        <Layout title={"Products"}>
            <div className='row mt-3 home'>
                <div className='col-md-3 text-center'>
                    <div className="filter">
                        <h4>Filter by category</h4>
                        <hr className='hr-text' />
                        <div className='d-flex flex-column text-muted'>
                            {categories?.map(c => (
                                <Checkbox className='radio' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h4 className='mt-4'>Filter by Prices</h4>
                        <hr className='hr-text' />
                        <div className="d-flex align-items-start text-muted flex-column filter-text">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices?.map((p) => (
                                    <div className='radio' key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="d-flex  flex-column">
                            <button className="btn mt-2 ms-1" onClick={() => window.location.reload()}>
                                RESET FILTER
                            </button>
                        </div>
                    </div>
                </div>

                <div className='col-md-9 text-center'>
                    <h4 className='text-head'>All products</h4>
                    <div className='row row-cols-1 row-cols-md-3 g-4'>
                        {loading ? (
                            renderShimmerCards(6)
                        ) : (
                            products?.map((p) => (
                                <div className="d-flex justify-content-between" key={p._id}>
                                    <div className="container-card">
                                        <div className="card">
                                            <div className="heart">
                                                <i className="fa fa-heart" />
                                            </div>
                                            <div className="top-div">
                                                <div className="border">
                                                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                                </div>
                                                <span>{p.price} Rs</span>
                                            </div>
                                            <div className="bottom-div">
                                                <h3>{p.name}</h3>
                                                <p>{p.description.substring(0, 30)}</p>
                                            </div>
                                            <div className="last-section">
                                                <div className="last-div">
                                                    <Link to='/cart'>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </Link>
                                                    <Link to={`/product/${p.slug}`}>
                                                        <i className="fa-solid fa-icon2 fa-comment-dots"></i>
                                                    </Link>
                                                </div>
                                                <div className="buttons">
                                                    <button onClick={() => {
                                                        addToCart(p);
                                                        toast.success('Item added to cart');
                                                    }}>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {loadingMore && renderShimmerCards(3)}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loadingMore ? "Loading..." : "Load more"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductsPage;
