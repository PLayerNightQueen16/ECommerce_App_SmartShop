import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowForwardOutline, IoDiamondOutline, IoShapesOutline, IoEarthOutline } from 'react-icons/io5';
import phoneImg from '../assets/phone.png';
const About = () => {
    const navigate = useNavigate();

    const values = [
        {
            icon: <IoDiamondOutline className="text-3xl" />,
            title: "Uncompromising Quality",
            desc: "Every piece in our collection undergoes a rigorous selection process to ensure it meets our 'Signature' standard of excellence."
        },
        {
            icon: <IoShapesOutline className="text-3xl" />,
            title: "Minimalist Aesthetic",
            desc: "We believe in the power of 'less but better.' Our products are chosen for their clean lines, functional beauty, and timeless appeal."
        },
        {
            icon: <IoEarthOutline className="text-3xl" />,
            title: "Global Curation",
            desc: "From the tech hubs of the west to the artisanal workshops of the east, we source the finest products from across the globe."
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--ivory)] selection:bg-[var(--teal)] selection:text-white">

            {/* 1. Hero Section: Editorial Style */}
            <section className="relative pt-40 pb-24 px-6 md:px-12 flex flex-col items-center text-center">
                <span className="text-[var(--gold-deep)] text-xs font-sans font-semibold tracking-[0.4em] uppercase mb-6 animate-[fadeIn_1s_ease-out]">
                    The Elvare Philosophy
                </span>
                <h1 className="max-w-4xl font-serif text-5xl md:text-8xl text-[var(--charcoal)] leading-[1.1] tracking-tight mb-12 animate-[fadeIn_1s_ease-out_0.2s_both]">
                    Elevating the <span className="italic">Everyday</span> into the Extraordinary.
                </h1>
                <div className="w-[1px] h-32 bg-gradient-to-b from-[var(--gold)] to-transparent"></div>
            </section>

            {/* 2. Brand Story: Split Layout */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                            <img
                                src={phoneImg}
                                alt="Elvare premium phone"
                                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        {/* Decorative Gold Frame */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border border-[var(--gold)] rounded-2xl -z-10 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="font-serif text-4xl text-[var(--charcoal)] tracking-wide">
                            Defined by detail, <br /> Driven by design.
                        </h2>
                        <p className="text-[var(--charcoal)] font-sans text-lg leading-relaxed opacity-80">
                            Founded in 2024, ShopSmart was born from a simple idea: shopping should feel effortless, intelligent, and inspiring.
                            In a world overflowing with choices, we set out to create more than just another online store. ShopSmart is designed to simplify decisions, elevate everyday purchases, and bring clarity to the chaos of modern commerce.

                            We don’t just offer products, we curate experiences.
                            Every feature, every recommendation, and every detail is built to help you shop smarter, faster, and with confidence.
                        </p>
                        <p className="text-[var(--charcoal)] font-sans text-lg leading-relaxed opacity-80">
                            At ShopSmart, we believe shopping should feel effortless yet exciting. From everyday essentials to indulgent finds, every product is carefully selected to balance quality, value, and style. Whether you're upgrading your space, refreshing your routine, or discovering something new, ShopSmart is designed to make every choice feel like the right one.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Core Values: Icon Grid */}
            <section className="bg-white py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-3xl md:text-5xl text-[var(--charcoal)] uppercase tracking-[0.2em]">Our Pillars</h2>
                        <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {values.map((value, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-[var(--ivory)] rounded-full flex items-center justify-center mb-8 group-hover:bg-[var(--teal)] group-hover:text-white transition-all duration-500 shadow-sm">
                                    {value.icon}
                                </div>
                                <h3 className="font-serif text-xl mb-4 text-[var(--charcoal)] tracking-wide">{value.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-xs uppercase tracking-widest font-semibold">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA Section */}
            <section className="py-32 px-6 text-center bg-gradient-to-br from-[var(--charcoal)] to-[#082933] text-white overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--teal)] opacity-10 rounded-full blur-[120px] -z-0"></div>

                <div className="relative z-10">
                    <h2 className="font-serif text-4xl md:text-6xl mb-8 tracking-tight">Ready to redefine your style?</h2>
                    <p className="text-[var(--beige)] font-sans text-lg mb-12 max-w-xl mx-auto opacity-80">
                        Join thousands of discerning customers who have chosen Elvare as their primary source for premium essentials.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="group inline-flex items-center gap-4 bg-white text-[var(--charcoal)] px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[var(--gold)] hover:text-white transition-all duration-500"
                    >
                        Browse the Collection
                        <IoArrowForwardOutline className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;