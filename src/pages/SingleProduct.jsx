import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; 
import { IoCartOutline, IoChevronBackOutline, IoStar, IoCheckmarkCircleOutline, IoHeartOutline, IoHeart } from 'react-icons/io5';

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: products, loading } = useData();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const product = useMemo(
        () => products.find((item) => String(item.id) === String(id)) || null,
        [products, id]
    );

    const [selectedImage, setSelectedImage] = useState('');
    const [isFading, setIsFading] = useState(false);

    const defaultImage = product?.images?.[0] || product?.thumbnail || '';
    const mainImage = product?.images?.includes(selectedImage) ? selectedImage : defaultImage;

    const handleImageSwap = (newImg) => {
        if (newImg === mainImage) return;
        setIsFading(true);
        setTimeout(() => {
            setSelectedImage(newImg);
            setIsFading(false);
        }, 200);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#07051A]">
                <div className="w-12 h-12 border-4 border-white/20 border-t-[var(--purple)] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#07051A] text-white">
                <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                    <h2 className="text-3xl font-serif mb-4">Product not found</h2>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 px-6 py-3 rounded-full bg-[var(--purple)] hover:bg-[var(--teal)] transition"
                    >
                        Back to collection
                    </button>
                </div>
            </div>
        );
    }

    const originalPrice = product.discountPercentage
        ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
        : null;

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#07051A] text-white">

            <div className="max-w-7xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 text-white/70 hover:text-[var(--purple)] transition"
                >
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-full">
                        <IoChevronBackOutline />
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase font-bold">Back to Collection</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* LEFT: IMAGE */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">

                        <div className="w-full aspect-square md:aspect-[4/5] bg-white rounded-3xl p-8">
                            <img
                                src={mainImage}
                                alt={product.title}
                                className={`w-full h-full object-contain transition-all duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleImageSwap(img)}
                                        className={`w-20 h-20 rounded-xl bg-white p-2 ${
                                            mainImage === img ? 'ring-2 ring-[var(--purple)]' : ''
                                        }`}
                                    >
                                        <img src={img} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: DETAILS */}
                    <div className="w-full lg:w-1/2">

                        <h1 className="text-4xl md:text-5xl font-serif mb-4">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <IoStar key={i} className={i < Math.round(product.rating) ? "" : "opacity-30"} />
                                ))}
                            </div>
                            <span className="text-sm text-white/70">
                                {product.rating} / 5
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-[var(--teal)]">
                                ${Number(product.price).toFixed(2)}
                            </span>
                            {originalPrice && (
                                <span className="line-through text-white/40">
                                    ${originalPrice}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-white/70 mb-8">
                            {product.description}
                        </p>

                        {/* Info */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                <span className="text-xs text-white/50">Stock</span>
                                <p>{product.stock} available</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                <span className="text-xs text-white/50">Category</span>
                                <p>{product.category}</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[var(--purple)] to-[var(--teal)] shadow-lg shadow-purple-500/30"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={() => toggleWishlist(product)}
                                className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center"
                            >
                                {isInWishlist(product.id) ? <IoHeart /> : <IoHeartOutline />}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;