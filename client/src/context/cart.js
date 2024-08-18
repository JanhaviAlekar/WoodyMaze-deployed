import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }, []);

    const addToCart = (item) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem._id === item._id);
            let updatedCart;
            if (itemIndex > -1) {
                updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity = (updatedCart[itemIndex].quantity || 1) + 1;
            } else {
                updatedCart = [...prevCart, { ...item, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem._id === id);
            if (itemIndex > -1) {
                const updatedCart = [...prevCart];
                if (updatedCart[itemIndex].quantity > 1) {
                    updatedCart[itemIndex].quantity -= 1;
                } else {
                    updatedCart.splice(itemIndex, 1);
                }
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            }
            return prevCart;
        });
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR"
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
