import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoTrashOutline, IoAdd, IoRemove, IoCartOutline, IoChevronBackOutline } from 'react-icons/io5';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, decreaseQuantity, addToCart } = useCart();

    const subtotal = cart?.reduce((total, item) => total + (Number(item.price) * item.quantity), 0) || 0;
    const taxes = subtotal * 0.08; 
    const total = subtotal + taxes;

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#07051A] text-white">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 mb-6 text-white/70 hover:text-[var(--purple)] transition"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-full">
                                <IoChevronBackOutline />
                            </div>
                            <span className="text-xs tracking-[0.2em] uppercase font-bold">
                                Continue Shopping
                            </span>
                        </button>

                        <h1 className="font-serif text-4xl md:text-5xl">
                            Your Shopping Cart
                        </h1>
                    </div>

                    {cart?.length > 0 && (
                        <p className="text-white/60 font-bold tracking-widest uppercase text-sm">
                            {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                        </p>
                    )}
                </div>

                {/* EMPTY STATE */}
                {!cart || cart.length === 0 ? (
                    <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 p-16 flex flex-col items-center text-center">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/10">
                            <IoCartOutline className="text-6xl text-[var(--purple)]" />
                        </div>

                        <h2 className="font-serif text-3xl mb-4">
                            Your cart is empty
                        </h2>

                        <p className="text-white/60 text-lg mb-10 max-w-md">
                            Looks like you haven’t added anything yet.
                        </p>

                        <button 
                            onClick={() => navigate('/products')}
                            className="px-10 py-4 bg-gradient-to-r from-[var(--purple)] to-[var(--teal)] text-white text-sm font-bold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-purple-500/30 hover:scale-105 transition"
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (

                    /* CART ITEMS */
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* LEFT SIDE */}
                        <div className="w-full lg:w-2/3 flex flex-col gap-6">
                            {cart.map((item) => (
                                <div key={item.id} className="group flex flex-col sm:flex-row gap-6 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:shadow-xl hover:shadow-purple-500/20 transition">

                                    {/* IMAGE */}
                                    <div 
                                        className="w-full sm:w-32 h-32 bg-white rounded-2xl p-3 cursor-pointer overflow-hidden"
                                        onClick={() => navigate(`/products/${item.id}`)}
                                    >
                                        <img 
                                            src={item.thumbnail} 
                                            alt={item.title} 
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* DETAILS */}
                                    <div className="flex flex-1 flex-col justify-between">

                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <span className="block text-[var(--teal)] text-xs uppercase mb-1">
                                                    {item.category}
                                                </span>

                                                <h3 
                                                    className="font-serif text-lg cursor-pointer hover:text-[var(--purple)]"
                                                    onClick={() => navigate(`/products/${item.id}`)}
                                                >
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <span className="font-bold text-[var(--teal)]">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>

                                        {/* QUANTITY */}
                                        <div className="flex justify-between items-center mt-6">

                                            <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                                <button onClick={() => decreaseQuantity(item.id)}>
                                                    <IoRemove />
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button onClick={() => addToCart(item)}>
                                                    <IoAdd />
                                                </button>
                                            </div>

                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-white/50 hover:text-red-400 transition"
                                            >
                                                <IoTrashOutline size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SIDE - SUMMARY */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 sticky top-32">

                                <h2 className="font-serif text-2xl mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6 text-white/70">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${taxes.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-[var(--teal)]">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-lg font-bold mb-6">
                                    <span>Total</span>
                                    <span className="text-[var(--teal)]">${total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--purple)] to-[var(--teal)] shadow-lg shadow-purple-500/30 hover:scale-105 transition"
                                >
                                    Secure Checkout
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;