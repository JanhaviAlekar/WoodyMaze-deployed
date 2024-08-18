import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/cardstyles.css";
import { Link } from "react-router-dom";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <main class="item">
              <section class="img">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  height="384x"
                  alt=""
                  class="img-main"
                />
              </section>

              <section class="price">
                <h2 class="price-sub__heading">
                  Category: {product?.category?.name}
                </h2>
                <h1 class="price-main__heading">
                  Product Name: {product.name}
                </h1>
                <p class="price-txt">Description: {product.description}</p>
                <div class="price-box">
                  <div class="price-box__main">
                    <span class="price-box__main-new">Rs.{product.price}</span>
                    <span class="price-box__main-discount"> 50%</span>
                  </div>
                  <div className="cart mt-4 align-items-center">
                    {" "}
                    <div className="buttons btn-add">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success("Item added to cart");
                        }}
                      >
                        Add to cart
                      </button>
                      <i className="fa fa-heart text-muted ml-2" />{" "}
                      <i className="fa fa-share-alt text-muted" />{" "}
                    </div>{" "}

                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h6>Similar products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found </p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="d-flex justify-content-between">
              <div key={p._id} className="container-card">
                <div className="card">
                  <div className="top-div">
                    <div className="border">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
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
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
