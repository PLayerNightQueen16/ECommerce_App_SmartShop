import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

// 🌌 DARK DREAMY TOAST STYLE
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

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('elvare_wishlist');
        if (!savedWishlist) return [];
        try {
            return JSON.parse(savedWishlist);
        } catch {
            localStorage.removeItem('elvare_wishlist');
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('elvare_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
        const isExisting = wishlist.find(item => String(item.id) === String(product.id));
        
        if (isExisting) {
            toast.info(`${product.title} removed from wishlist`, {
                icon: "🖤",
                style: toastStyle,
                progressStyle: {
                    background: 'linear-gradient(90deg, #7F3DFF, #2ED3C6)'
                }
            });

            setWishlist(prev => prev.filter(item => String(item.id) !== String(product.id)));
        } else {
            toast.success(`${product.title} saved to wishlist!`, {
                icon: "💜",
                style: toastStyle,
                progressStyle: {
                    background: 'linear-gradient(90deg, #7F3DFF, #2ED3C6)'
                }
            });

            setWishlist(prev => [...prev, product]);
        }
    };

    const isInWishlist = (productId) => 
        wishlist.some(item => String(item.id) === String(productId));

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);