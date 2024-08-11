import React from 'react'
import Layout from './../components/layout/layout';
import { useSearch } from '../context/search';
import { useNavigate } from "react-router"
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate()
    const [cart, setCart] = useCart();
    return (
        <Layout title={'Search Results'}>
            <div className='container text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values.results.length} item`} </h6>
                <div className='d-flex flex-wrap'>{
                    values?.results.map(p => (

                        <div className="d-flex justify-content-between">
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text">{p.price}</p>
                                    <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                    <button className='btn btn-secondary ms-1' onClick={() => {
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

export default Search