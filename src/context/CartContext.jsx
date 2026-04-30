import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

// 🌌 DARK GLASS TOAST STYLE
const toastStyle = {
    borderRadius: '16px',
    background: 'rgba(13, 10, 42, 0.9)',
    color: '#F1F1F5',
    border: '1px solid rgba(127, 61, 255, 0.25)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 0 20px rgba(127, 61, 255, 0.25)',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    letterSpacing: '0.05em'
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('elvare_cart');
        if (!savedCart) return [];
        try {
            return JSON.parse(savedCart);
        } catch {
            localStorage.removeItem('elvare_cart');
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('elvare_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingItem = cart.find(item => String(item.id) === String(product.id));
        
        if (existingItem) {
            toast.info(`Increased ${product.title} quantity`, { 
                icon: "🔄",
                style: toastStyle,
                progressStyle: {
                    background: 'linear-gradient(90deg, #7F3DFF, #2ED3C6)'
                }
            });

            setCart(prev => prev.map(item => 
                String(item.id) === String(product.id)
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            ));

        } else {
            toast.success(`${product.title} added to cart!`, { 
                icon: "🛍️",
                style: toastStyle,
                progressStyle: {
                    background: 'linear-gradient(90deg, #7F3DFF, #2ED3C6)'
                }
            });

            setCart(prev => [...prev, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId, productTitle) => {
        toast.error(`${productTitle || 'Item'} removed from cart`, { 
            icon: "🗑️",
            style: toastStyle,
            progressStyle: {
                background: 'linear-gradient(90deg, #FF4D6D, #7F3DFF)'
            }
        });

        setCart(prev => prev.filter(item => String(item.id) !== String(productId)));
    };

    const decreaseQuantity = (productId, productTitle) => {
        const existingItem = cart.find(item => String(item.id) === String(productId));
        
        if (existingItem?.quantity === 1) {
            toast.error(`${productTitle || 'Item'} removed from cart`, { 
                icon: "🗑️",
                style: toastStyle,
                progressStyle: {
                    background: 'linear-gradient(90deg, #FF4D6D, #7F3DFF)'
                }
            });

            setCart(prev => prev.filter(item => String(item.id) !== String(productId)));

        } else if (existingItem) {
            toast.info(`Decreased ${productTitle || 'Item'} quantity`, { 
                icon: "➖",
                style: toastStyle,
                progressStyle: {
                    background: 'linear-gradient(90deg, #7F3DFF, #2ED3C6)'
                }
            });

            setCart(prev => prev.map(item => 
                String(item.id) === String(productId)
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);