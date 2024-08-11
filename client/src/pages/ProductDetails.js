import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import { useParams } from 'react-router'
import { useNavigate } from "react-router"
import axios from 'axios'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
import "../styles/cardstyles.css"
const ProductDetails = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart();
    const params = useParams();
    const [product, setProduct] = useState({});

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6 box">
                                    <div className="images p-3">
                                        <div className="text-center p-3"> <img alt="product-img" height="384x" id="main-image" src={`/api/v1/product/product-photo/${product._id}`} width={384} /> </div>

                                    </div>
                                </div>
                                <div className="col-md-6 box">
                                    <div className="product p-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center"> <i className="fa fa-long-arrow-left" /> <span className="ml-1">Back</span> </div> <i className="fa fa-shopping-cart text-muted" />
                                        </div>
                                        <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">{product?.category?.name}</span>
                                            <h5 className="text-uppercase">{product.name}</h5>
                                            <div className="price d-flex flex-row align-items-center"> <span className="act-price">{product.price}</span>
                                                <div className="ml-2"> <small className="dis-price">$59</small> <span>40% OFF</span> </div>
                                            </div>
                                        </div>
                                        <p className="about">{product.description}</p>
                                        <div className="sizes mt-5">
                                            <h6 className="text-uppercase">Size</h6> <label className="radio"> <input type="radio" name="size" defaultValue="S" defaultChecked /> <span>S</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="M" /> <span>M</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="L" /> <span>L</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="XL" /> <span>XL</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="XXL" /> <span>XXL</span> </label>
                                        </div>
                                        <div className="cart mt-4 align-items-center"> <button className="btn" onClick={() => {
                                            setCart([...cart, product])
                                            localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                            toast.success('Item added to cart');
                                        }}>Add to cart</button> <i className="fa fa-heart text-muted" /> <i className="fa fa-share-alt text-muted" /> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container mt-5 mb-5'>
                <h6>Similar products</h6>
                {relatedProducts.length < 1 && (<p className="text-center">No similar products found </p>)}
                <div className='d-flex flex-wrap'>{
                    relatedProducts?.map(p => (

                        <div className="d-flex justify-content-between">
                            <div className="card m-2" style={{ width: "14rem" }}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.price}</p>
                                    <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                    <button className='btn btn-secondary ms-1'
                                        onClick={() => {
                                            setCart([...cart, p])
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                            toast.success('Item added to cart');
                                        }}>Add to cart</button>
                                </div>
                            </div>
                        </div>

                    ))
                }
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails