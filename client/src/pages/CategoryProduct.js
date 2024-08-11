import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import axios from 'axios'
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        if (params?.slug) getProductByCategory();

    }, [params?.slug])
    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.product);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className='container'>
                <h1 className='text-center'>
                    {category?.name}
                </h1>
                <h1 className='text-center'>
                    {products?.length} results found
                </h1>
                <div className='row'>
                    <div className='d-flex flex-wrap'>{
                        products?.map(p => (

                            <div className="d-flex justify-content-between">
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}</p>
                                        <p className="card-text">{p.price}</p>
                                        <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                        <button className='btn btn-secondary ms-1'>Add to cart</button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct