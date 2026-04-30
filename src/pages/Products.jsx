import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';
import { useData } from '../context/DataContext';

function Products() {
    const { data: products, loading, error } = useData();
    const location = useLocation();

    const [search, setSearch] = useState('');
    const [brand, setBrand] = useState('All');
    const [category, setCategory] = useState(() => location.state?.category || 'All');
    const [priceRange, setPriceRange] = useState([0, 5000]);

    const handleBrandChange = (e) => setBrand(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);

    // Filter Logic
    const filteredProducts = products?.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        const matchesBrand = brand === 'All' || product.brand === brand;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    }) || [];

    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 px-6 md:px-12">
            
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h1 className="text-[#1A2A3A] font-serif text-3xl md:text-5xl tracking-[0.15em] uppercase mb-4">
                    The Collection
                </h1>
                <p className="text-[#5A5A5A] font-sans text-xs tracking-widest uppercase opacity-70">
                    Curated goods for the refined aesthetic
                </p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
                
                <aside className="w-full md:w-64 flex-shrink-0">
                    <FilterSection 
                        search={search} setSearch={setSearch} 
                        brand={brand} setBrand={setBrand} 
                        priceRange={priceRange} setPriceRange={setPriceRange} 
                        category={category} setCategory={setCategory} 
                        handleBrandChange={handleBrandChange} 
                        handleCategoryChange={handleCategoryChange}
                    />
                </aside>

                <main className="flex-1">
                    {error && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}
                    <div className="mb-8 text-[#1A2A3A] font-sans text-[10px] tracking-[0.2em] uppercase opacity-50 border-b border-gray-200 pb-4">
                        Showing {filteredProducts.length} Results
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--gold)]/30 border-t-[var(--teal)]"></div>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center bg-white/50 border border-white/60 py-12 px-6 rounded-3xl">
                            <h2 className="text-[#1A2A3A] font-serif text-2xl mb-3">No products found</h2>
                            <p className="text-[#5A5A5A] opacity-60 font-sans text-xs tracking-widest uppercase max-w-sm">
                                We couldn't find anything matching your current filters.
                            </p>
                            <button 
                                onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0,5000]); }}
                                className="mt-6 border-b border-[#0F4C5C] text-[#0F4C5C] font-sans text-xs tracking-[0.2em] uppercase pb-1"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Products;