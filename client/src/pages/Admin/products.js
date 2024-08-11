import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/adminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
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
    return (
        <Layout title={"All products"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 text-centre'>
                        <h1>All products list</h1>

                        <div className="d-flex flex-wrap">{
                            products?.map(p => (
                                <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`} className='product-link'>
                                    <div className="d-flex">
                                        <div className="card m-2" style={{ width: "18rem" }}>
                                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.price}</p>

                                                <p className="card-text">{p.description}</p>

                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products