import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "react-slick";
import Category from './Category';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import TopProducts from './TopProducts';

const Slider = SlickSlider.default || SlickSlider;

const CustomArrow = ({ onClick, direction }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center
        transition-all duration-700 ease-in-out
        opacity-0 group-hover:opacity-100 group-hover:translate-x-0
        ${direction === 'left' ? 'left-10 -translate-x-4' : 'right-10 translate-x-4'}`}
    >
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full 
            bg-white/10 backdrop-blur-xl border border-white/20 text-[var(--charcoal)]
            hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)] 
            hover:scale-110 transition-all duration-300 shadow-2xl">
            {direction === 'left' ? <HiOutlineArrowNarrowLeft size={24} /> : <HiOutlineArrowNarrowRight size={24} />}
        </div>
    </button>
);

const Carousel = () => {
    const { data } = useData();
    const navigate = useNavigate();

    const settings = {
        dots: true,
        dotsClass: "slick-dots custom-dots",
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000, // Slightly slower for readability
        infinite: true,
        speed: 1000,
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
    };

    return (
        <section className="group relative bg-[#F7F4EF] min-h-[700px] flex items-center overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#E8DCCB] blur-[120px] opacity-50" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#7ED6C3] blur-[150px] opacity-20" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <Slider {...settings}>
                    {data?.slice(0, 10)?.map((product, index) => (
                        <div key={index} className="outline-none">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12">
                                
                                <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                                    <div className="overflow-hidden">
                                        <span className="inline-block text-[#7A5C9E] font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4">
                                            Established Quality & Style
                                        </span>
                                        <h1 className="text-5xl md:text-8xl font-serif font-light leading-[1] text-[#2B2B2B] mb-6 cursor-pointer" 
                                            onClick={() => navigate(`/products/${product.id}`)}>
                                            {product.title.split(' ')[0]} <br/>
                                            <span className="font-bold text-[#C89B5E] italic">
                                                {product.title.split(' ').slice(1).join(' ')}
                                            </span>
                                        </h1>
                                        <p className="text-[#2B2B2B]/70 text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0 line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-6 justify-center md:justify-start items-center">
                                        <button 
                                            onClick={() => navigate('/products')}
                                            className="group relative px-10 py-4 bg-[#2B2B2B] overflow-hidden rounded-sm transition-all duration-500"
                                        >
                                            <div className="absolute inset-0 w-0 bg-[#C89B5E] transition-all duration-[0.4s] ease-out group-hover:w-full" />
                                            <span className="relative text-white text-xs font-bold tracking-[0.2em] uppercase">
                                                Explore Collection
                                            </span>
                                        </button>

                                        <button 
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            className="text-[#2B2B2B] text-xs font-bold tracking-[0.2em] uppercase border-b border-[#C89B5E] pb-1 hover:text-[#C89B5E] transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 relative flex justify-center items-center">
                                    <div className="absolute w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border border-[#C89B5E]/10" />
                                    <div className="absolute w-64 h-64 md:w-[400px] md:h-[400px] rounded-full border border-[#C89B5E]/20 rotate-45" />
                                    
                                    <div 
                                        className="relative animate-float transition-all duration-1000 group-hover:scale-105 cursor-pointer"
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-[300px] md:w-[500px] h-auto object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.12)]"
                                        />
                                        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-1/2 h-4 bg-black/5 blur-xl rounded-[100%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                
                {/* These are likely static or follow the slider */}
                <Category/>
                <TopProducts/>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .custom-dots { bottom: 50px !important; display: flex !important; justify-content: center; gap: 12px; }
                .custom-dots li { margin: 0 !important; width: auto !important; height: auto !important; }
                .custom-dots li button { width: 40px !important; height: 2px !important; background: #2B2B2B20 !important; padding: 0 !important; transition: all 0.4s ease; }
                .custom-dots li button:before { display: none; }
                .custom-dots li.slick-active button { background: #C89B5E !important; width: 60px !important; }
            `}</style>
        </section>
    );
};

export default Carousel;