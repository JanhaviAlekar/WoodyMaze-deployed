import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/prices'
import { useNavigate } from 'react-router'
import { useCart } from '../context/cart'
import img1 from "../styles/home.jpg"
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadmore, setLoadmore] = useState(false)

    //get all category
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
        getTotal()
    }, [])
    // get all products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    //lifecycvle method to get product at initial time
    useEffect(() => {
        getAllProducts();
    }, [])

    //get count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total)
        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])
    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(c => c._id === id);
        }
        setChecked(all)
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllCategory(); //initial time
    }, [checked.length, radio.lenght]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio])

    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filter', { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={"WoodyMaze"}>
            <section className="hero" id="home" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="hero-content">
                        <p className="hero-subtitle">Fashion Everyday</p>
                        <h2 className="h1 hero-title">Unrivalled Fashion House</h2>
                        <Link to='/'>
                        <button className="btn">Shop Now</button>
                        </Link>
                    </div>
                </div>
            </section>


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
                        {/* //price filter */}
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
                                RESET FILTER </button>
                        </div>
                    </div>
                </div>

                <div className='col-md-9 text-center'>
                    <h4 className='text-head'>All products</h4>
                    <div className=' row row-cols-1 row-cols-md-3 g-4 '>{
                        products?.map(p => (

                            <div className="d-flex justify-content-between">
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
                                                <i class="fa fa-shopping-cart" ></i>
                                                <i class="fa-solid fa-icon2 fa-comment-dots"></i>
                                            </div>
                                            <div className="buttons ">
                                                <button onClick={() => {
                                                    setCart([...cart, p])
                                                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                    toast.success('Item added to cart');
                                                }}>Add to cart</button>
                                            </div>
                                            <>
                                            </>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        ))
                    }
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn '
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1)
                                }}>
                                {loading ? "Loading..." : "Loadmore"}
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </Layout >
    )
}

export default HomePage