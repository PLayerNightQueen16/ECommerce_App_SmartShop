import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { IoHeartDislikeOutline, IoCartOutline, IoChevronBackOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (item) => {
        addToCart(item);
        toggleWishlist(item);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#07051A] text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 mb-6 text-white/70 hover:text-[var(--purple)] transition"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-full">
                                <IoChevronBackOutline />
                            </div>
                            <span className="text-xs tracking-[0.2em] uppercase font-bold">Back</span>
                        </button>

                        <h1 className="font-serif text-4xl md:text-5xl">
                            Your Curated Collection
                        </h1>
                    </div>

                    {wishlist?.length > 0 && (
                        <p className="text-white/60 font-bold tracking-widest uppercase text-sm">
                            {wishlist.length} {wishlist.length === 1 ? 'Saved Item' : 'Saved Items'}
                        </p>
                    )}
                </div>

                {/* EMPTY STATE */}
                {wishlist.length === 0 ? (
                    <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 p-16 flex flex-col items-center text-center">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/10">
                            <CiHeart className="text-6xl text-[var(--purple)]" />
                        </div>

                        <h2 className="font-serif text-3xl mb-4">
                            Nothing caught your eye yet
                        </h2>

                        <button 
                            onClick={() => navigate('/products')}
                            className="px-10 py-4 bg-gradient-to-r from-[var(--purple)] to-[var(--teal)] text-white text-sm font-bold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-purple-500/30 hover:scale-105 transition"
                        >
                            Discover Products
                        </button>
                    </div>
                ) : (

                    /* PRODUCTS GRID */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {wishlist.map((item) => (
                            <div key={item.id} className="group flex flex-col bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 hover:shadow-xl hover:shadow-purple-500/20 transition">

                                {/* IMAGE */}
                                <div className="relative w-full aspect-[4/5] bg-white rounded-2xl p-4 mb-5 overflow-hidden">
                                    <img 
                                        src={item.image || item.thumbnail} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                                        onClick={() => navigate(`/products/${item.id}`)}
                                    />

                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleWishlist(item);
                                        }}
                                        className="absolute top-3 right-3 p-2.5 bg-white/80 rounded-full text-gray-400 hover:text-red-400 transition"
                                    >
                                        <IoHeartDislikeOutline className="text-lg" />
                                    </button>
                                </div>

                                {/* INFO */}
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-serif text-lg mb-2">
                                        {item.title}
                                    </h3>

                                    <span className="font-bold text-[var(--teal)] text-lg">
                                        ${Number(item.price).toFixed(2)}
                                    </span>

                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleMoveToCart(item);
                                        }}
                                        className="mt-5 w-full py-3 bg-gradient-to-r from-[var(--purple)] to-[var(--teal)] text-white rounded-xl text-xs font-bold uppercase hover:scale-105 transition"
                                    >
                                        <IoCartOutline className="inline mr-2 text-lg" />
                                        Move to Cart
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;