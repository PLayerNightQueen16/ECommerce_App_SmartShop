import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const TopProducts = () => {
    const navigate = useNavigate();
    
    // 1. State to track how many items to show
    const [visibleCount, setVisibleCount] = useState(3);
    
    // Pulling the data from your context
    const { data } = useData();

    // 2. Filter products for rating > 4
    const allTopRatedProducts = data?.filter((product) => product.rating > 4) || [];
    
    // 3. Slice the array based on visibleCount
    const visibleProducts = allTopRatedProducts.slice(0, visibleCount);

    // Function to handle the "Discover More" button
    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    return (
        <div className="bg-[var(--ivory)] py-24 px-6 md:px-12 flex flex-col items-center">
            
            {/* Section Header */}
            <div className="text-center mb-20 flex flex-col items-center">
                <span className="text-[var(--gold-deep)] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
                    Highest Rated
                </span>
                <h2 className="text-[var(--charcoal)] font-serif text-3xl md:text-5xl tracking-[0.15em] uppercase mb-8">
                    Signature Picks
                </h2>
                <div className="w-16 h-[1px] bg-[var(--gold)]"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
                {visibleProducts?.map((product) => (
                    <div 
                        key={product.id} 
                        className="group flex flex-col cursor-pointer"
                        // FIXED: Changed to /products/ to match App.jsx routes
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        
                        {/* Image Container */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--beige)] mb-8">
                            <img 
                                src={product.thumbnail} 
                                alt={product.title}     
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 bg-white"
                            />
                            
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Elegant Slide-up Bar */}
                            <div className="absolute bottom-0 left-0 w-full py-5 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-center items-center border-t border-[var(--gold-glow)]">
                                <span className="text-[var(--teal)] text-xs font-bold tracking-[0.25em] uppercase">
                                    Discover
                                </span>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-3 px-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[var(--gold-deep)] text-[10px] font-sans font-semibold tracking-[0.2em] uppercase">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 opacity-80">
                                    <span className="text-[var(--gold)] text-[10px]">★</span>
                                    <span className="text-[var(--charcoal)] text-[11px] font-sans font-medium tracking-wider">
                                        {product.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-start gap-4">
                                <h3 className="text-[var(--charcoal)] font-serif text-xl tracking-wide group-hover:text-[var(--purple)] transition-colors duration-500 line-clamp-1">
                                    {product.title}
                                </h3>
                                <span className="text-[var(--charcoal)] font-sans text-sm tracking-widest mt-1 whitespace-nowrap">
                                    ${Number(product.price).toFixed(2)}
                                </span>
                            </div>

                            <p className="text-[var(--charcoal)] font-sans text-sm tracking-wide opacity-70 leading-relaxed mt-2 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="w-0 h-[1px] bg-[var(--teal)] mt-4 group-hover:w-full transition-all duration-700 ease-out"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {visibleCount < allTopRatedProducts.length && (
                <div className="mt-20 flex justify-center w-full">
                    <button 
                        onClick={handleShowMore}
                        className="
                            group relative overflow-hidden inline-block 
                            py-4 px-12 bg-transparent 
                            border border-[var(--beige)]
                            font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[var(--charcoal)]
                            transition-all duration-500 ease-out
                            hover:border-[var(--teal)] hover:text-white
                        "
                    >
                        <div className="absolute inset-0 bg-[var(--teal)] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10"></div>
                        Discover More
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopProducts;