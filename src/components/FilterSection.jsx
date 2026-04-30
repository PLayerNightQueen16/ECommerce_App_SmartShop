import React from 'react'
import { useData } from '../context/DataContext'

const FilterSection = ({ search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategory, handleBrandChange, handleCategoryChange }) => {
    const { categoryOnlyData, brandOnlyData } = useData()

    return (
        <div className="flex flex-col gap-10 sticky top-32">
            {/* Search Input */}
            <div>
                <input
                    type="text"
                    placeholder="SEARCH COLLECTION..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent border-b border-[var(--beige)] pb-2 text-[var(--charcoal)] font-sans text-xs tracking-[0.15em] uppercase focus:outline-none focus:border-[var(--teal)] transition-colors placeholder:opacity-40"
                />
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="text-[var(--gold-deep)] font-serif text-sm tracking-[0.2em] uppercase mb-5">Category</h3>
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {/* The "All" Radio Button */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="category"
                            checked={category === 'All'}
                            value="All"
                            onChange={handleCategoryChange}
                            className="accent-[var(--teal)] w-3 h-3 cursor-pointer"
                        />
                        <span className="text-[var(--charcoal)] font-sans text-[11px] tracking-widest uppercase group-hover:text-[var(--teal)] transition-colors">
                            All Categories
                        </span>
                    </label>

                    {/* Mapped Categories */}
                    {categoryOnlyData?.map((item, index) => {
                        if (!item) return null;
                        return (
                            <label key={index} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={category === item}
                                    value={item}
                                    onChange={handleCategoryChange}
                                    className="accent-[var(--teal)] w-3 h-3 cursor-pointer"
                                />
                                <span className="text-[var(--charcoal)] font-sans text-[11px] tracking-widest uppercase group-hover:text-[var(--teal)] transition-colors">
                                    {item}
                                </span>
                            </label>
                        )
                    })}
                </div>
            </div>

            {/* Brand Filter */}
            <div>
                <h3 className="text-[var(--gold-deep)] font-serif text-sm tracking-[0.2em] uppercase mb-5">Brand</h3>
                <select
                    value={brand}
                    onChange={handleBrandChange}
                    className="w-full bg-transparent border border-[var(--beige)] p-3 text-[var(--charcoal)] font-sans text-xs tracking-[0.1em] uppercase focus:outline-none focus:border-[var(--teal)] transition-colors cursor-pointer"
                >
                    <option value="All">ALL BRANDS</option>
                    {brandOnlyData?.map((item, index) => {
                        if (!item) return null;
                        return (
                            <option key={index} value={item}>
                                {item.toUpperCase()}
                            </option>
                        )
                    })}
                </select>
            </div>

            {/* Price Range Filter */}
            <div>
                <h3 className="text-[var(--gold-deep)] font-serif text-sm tracking-[0.2em] uppercase mb-5">Price Range</h3>
                <div className="flex flex-col gap-4">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-[var(--teal)] cursor-pointer"
                    />
                    <p className="text-[var(--charcoal)] font-sans text-[11px] tracking-widest">
                        UP TO ${priceRange[1]}
                    </p>
                </div>
            </div>

            {/* Reset Button */}
            <button
                onClick={() => {
                    setSearch('');
                    setCategory('All');
                    setBrand('All');
                    setPriceRange([0, 5000])
                }}
                className="mt-2 py-3 border border-[var(--charcoal)] text-[var(--charcoal)] font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--charcoal)] hover:text-white transition-all duration-500"
            >
                Reset Filters
            </button>
        </div>
    )
}

export default FilterSection