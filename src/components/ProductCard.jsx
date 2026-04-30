import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { IoCartOutline, IoHeartOutline, IoHeart } from 'react-icons/io5';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div
            className="group cursor-pointer flex flex-col gap-4"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <div className="relative aspect-[4/5] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-white/10 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/20">

                {product.discountPercentage && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-deep)] text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase z-10 shadow-md">
                        {Math.round(product.discountPercentage)}% OFF
                    </div>
                )}

                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-[var(--gold)] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                    {isInWishlist(product.id) ? (
                        <IoHeart size={18} className="text-[var(--gold)] drop-shadow-sm scale-110" />
                    ) : (
                        <IoHeartOutline size={18} />
                    )}
                </button>

                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <img
                        src={product.thumbnail || product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${product.stock > 0
                                ? 'bg-[var(--teal)] text-white hover:bg-[var(--purple)]'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <IoCartOutline size={16} />
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>

            <div className="text-center px-2">
                <span className="block text-[var(--teal)] text-[9px] font-bold tracking-[0.2em] uppercase mb-1 opacity-80">
                    {product.brand || product.category}
                </span>
                <h3 className="font-serif text-lg text-[var(--charcoal)] truncate mb-1 group-hover:text-[var(--gold)] transition-colors duration-300">
                    {product.title}
                </h3>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-[var(--charcoal)] font-bold tracking-wide">
                        ${Number(product.price).toFixed(2)}
                    </span>
                    {product.discountPercentage && (
                        <span className="text-gray-400 text-xs line-through decoration-[var(--gold)]/50">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;