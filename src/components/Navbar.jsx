import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { FaCaretDown } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext'; 
import { useWishlist } from '../context/WishlistContext';

function Navbar({ location, getLocation, openDropdown, setOpenDropdown }) {
    // FIXED: Changed 'cartItem' to 'cart' to pull the correct state variable
    const { cart } = useCart();
    const { wishlist } = useWishlist(); 
    
    // FIXED: Updated to map over 'cart' instead of 'cartItem', and added a fallback of 1 for quantity
    const cartCount = cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
    const wishlistCount = wishlist?.length || 0;

    const navLinkStyles = ({ isActive }) => 
        `relative py-2 text-[12px] tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
            isActive ? "text-[#0F4C5C]" : "text-[#5A5A5A] hover:text-[#D4AF37]"
        }`;

    return (
    <div className="w-full sticky top-0 z-50 font-sans">
        <div className="bg-white/70 backdrop-blur-xl border-b border-white shadow-[0_4px_30px_rgba(15,76,92,0.05)] transition-all duration-500">
            <div className="max-w-[90rem] mx-auto px-8 lg:px-12 py-4 flex items-center justify-between">

                {/* LEFT: LOGO & LOCATION */}
                <div className="flex items-center gap-14">
                    {/* FIXED LOGO: Added z-index and removed potential blocking overlays */}
                    <Link to="/About" className="relative z-10 flex items-center group">
                        <img 
                            src={logo} 
                            alt="Elvaré Home" 
                            className="h-14 w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl bg-[#D4AF37]/20 transition duration-700 pointer-events-none -z-10"></div>
                    </Link>

                    {/* LOCATION PILL */}
                    <div className="relative">
                        <div 
                            className="flex items-center gap-3 px-5 py-2 rounded-full bg-[#FAFAFA]/60 hover:bg-white border border-[#F4EFE6] hover:border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" 
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >
                            <MapPin className="text-[#0F4C5C] w-[18px] h-[18px]" />
                            <div className="flex flex-col justify-center min-w-[80px]">
                                {location ? (
                                    <>
                                        <span className="text-[12px] font-bold text-[#1A2A3A] leading-tight">
                                            {location.county || location.city}
                                        </span>
                                        <span className="text-[9px] text-[#B5952F] font-bold uppercase tracking-[0.2em]">
                                            {location.state}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[#0F4C5C] font-bold text-[11px] tracking-[0.2em] uppercase mt-0.5">
                                        Set Location
                                    </span>
                                )}
                            </div>
                            <FaCaretDown className={`text-[#D4AF37] text-sm transition-transform duration-500 ${openDropdown ? 'rotate-180' : 'rotate-0'}`} />
                        </div>

                        {/* DROPDOWN MENU */}
                        {openDropdown && (
                            <div 
                                onClick={(e) => e.stopPropagation()} 
                                className="absolute top-14 left-0 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_rgba(15,76,92,0.15)] border border-white p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-[#F4EFE6] pb-4">
                                    <h1 className="text-[#1A2A3A] font-bold uppercase tracking-[0.2em] text-[10px]">Delivery Location</h1>
                                    <button 
                                        onClick={() => setOpenDropdown(false)} 
                                        className="text-[#5A5A5A] hover:text-[#0F4C5C] p-1 bg-[#FAFAFA] rounded-full"
                                    >
                                        <CgClose size={16} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => {
                                        getLocation(); // Trigger geolocation logic
                                        setOpenDropdown(false); // Close dropdown
                                    }} 
                                    className="w-full relative overflow-hidden bg-gradient-to-r from-[#0F4C5C] to-[#082933] text-white py-3 rounded-xl text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg active:scale-95 group"
                                >
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    <span className="relative z-10">Detect my location</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* CENTER: NAV LINKS */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-12">
                        {[{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: 'About', path: '/about' }].map((link) => (
                            <NavLink key={link.name} to={link.path} className={navLinkStyles}>
                                {({ isActive }) => (
                                    <span className="relative group flex items-center h-full py-1">
                                        {link.name}
                                        <span className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#0F4C5C] to-[#D4AF37] transition-all duration-500 ease-out rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </ul>
                </nav>

                {/* RIGHT: ICONS */}
                <div className="flex items-center gap-6">
                    <Link to={'/wishlist'} className="relative group">
                        <div className="p-2.5 rounded-full transition-all duration-300 group-hover:bg-[#F4EFE6]">
                            <CiHeart className="w-6 h-6 stroke-[1] text-[#1A2A3A] group-hover:text-[#D4AF37]" />
                        </div>
                        {wishlistCount > 0 && (
                            <span className="absolute top-0.5 right-0.5 bg-[#0F4C5C] text-white text-[9px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link to={'/cart'} className="relative group">
                        <div className="p-2.5 rounded-full transition-all duration-300 group-hover:bg-[#F4EFE6]">
                            <IoCartOutline className="w-6 h-6 text-[#1A2A3A] group-hover:text-[#0F4C5C]" />
                        </div>
                        {cartCount > 0 && (
                            <span className="absolute top-0.5 right-0.5 bg-[#D4AF37] text-white text-[9px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Navbar;