import React from 'react'
import { Link } from 'react-router-dom'
// Make sure this path matches your actual file structure!
import Logo from '../assets/logo.png' 
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[var(--ivory)] pt-24 pb-8 border-t border-[var(--beige)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* 1. Brand & Info */}
        <div className="md:col-span-12 lg:col-span-4 flex flex-col">
          <Link to="/" className="inline-block mb-8 group">
            {/* The Main Logo with a smooth hover scale animation */}
            <img 
              src={Logo} 
              alt="ShopSmart Logo" 
              className="h-14 w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />
          </Link>
          <p className="text-[var(--charcoal)] font-sans text-sm tracking-wide opacity-80 leading-relaxed mb-6 max-w-sm">
            Elevating your everyday with curated excellence. Discover the art of refined living.
          </p>
          <div className="flex flex-col gap-3 text-[var(--charcoal)] font-sans text-xs tracking-widest uppercase font-medium">
            <p className="opacity-70">123 Maison St, Style City, Bengaluru</p>
            {/* Animated Email Link */}
            <a href="mailto:atelier@elvare.com" className="relative w-fit group text-[var(--teal)]">
              atelier@shopsmart.com
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--teal)] transition-all duration-500 ease-out group-hover:w-full"></span>
            </a>
            <p className="opacity-70">+1 (800) 123-4567</p>
          </div>
        </div>

        {/* 2. Customer Service Links */}
        <div className="md:col-span-4 lg:col-span-2">
          <h3 className="text-[var(--gold-deep)] font-serif text-sm tracking-[0.2em] uppercase mb-8">
            Client Care
          </h3>
          <ul className="flex flex-col gap-5 text-[var(--charcoal)] font-sans text-xs tracking-[0.15em] uppercase font-medium">
            {['Contact Us', 'Shipping & Returns', 'FAQ', 'Order Tracking', 'Size Guide'].map((link) => (
              <li key={link}>
                <Link to="#" className="relative group inline-block hover:text-[var(--purple)] transition-colors duration-300">
                  {link}
                  {/* Left-to-right underline animation on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--purple)] transition-all duration-500 ease-out group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Animated Social Media Icons */}
        <div className="md:col-span-4 lg:col-span-2">
          <h3 className="text-[var(--gold-deep)] font-serif text-sm tracking-[0.2em] uppercase mb-8">
            Socials
          </h3>
          <div className="flex gap-4">
            {/* Instagram - Fills with Purple on hover */}
            <a href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--beige)] overflow-hidden transition-all duration-500 hover:border-[var(--purple)] hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 bg-[var(--purple)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <FaInstagram className="text-[var(--charcoal)] group-hover:text-white transition-colors duration-500 z-10 text-sm" />
            </a>
            {/* Pinterest - Fills with Teal on hover */}
            <a href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--beige)] overflow-hidden transition-all duration-500 hover:border-[var(--teal)] hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 bg-[var(--teal)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <FaPinterestP className="text-[var(--charcoal)] group-hover:text-white transition-colors duration-500 z-10 text-sm" />
            </a>
            {/* Facebook - Fills with Gold on hover */}
            <a href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--beige)] overflow-hidden transition-all duration-500 hover:border-[var(--gold)] hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <FaFacebookF className="text-[var(--charcoal)] group-hover:text-white transition-colors duration-500 z-10 text-sm" />
            </a>
            {/* Twitter - Fills with Charcoal on hover */}
            <a href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--beige)] overflow-hidden transition-all duration-500 hover:border-[var(--charcoal)] hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 bg-[var(--charcoal)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <FaTwitter className="text-[var(--charcoal)] group-hover:text-white transition-colors duration-500 z-10 text-sm" />
            </a>
          </div>
        </div>

        {/* 4. Animated Newsletter Form */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col">
          <h3 className="text-[var(--gold-deep)] font-serif text-sm tracking-[0.2em] uppercase mb-6">
            The Inner Circle
          </h3>
          <p className="text-[var(--charcoal)] font-sans text-xs tracking-wide opacity-80 leading-relaxed mb-6">
            Sign up to receive exclusive offers, editorial updates, and private invitations.
          </p>
          
          <form className="relative flex flex-col mt-auto group" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS"
              className="
                peer w-full bg-transparent 
                border-b border-[var(--beige)]
                pb-3 pt-2 px-0
                text-[var(--charcoal)] font-sans text-xs tracking-[0.15em] uppercase
                focus:outline-none focus:border-transparent
                transition-all duration-500 placeholder:text-[var(--charcoal)] placeholder:opacity-40
              "
              required
            />
            {/* Animated border line that expands from the center when input is focused */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--teal)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] peer-focus:w-full"></span>
            
            <button 
              type="submit" 
              className="
                absolute right-0 bottom-2
                text-[var(--charcoal)] font-sans text-xs font-bold tracking-[0.2em] uppercase
                hover:text-[var(--teal)] transition-colors duration-500
                peer-focus:text-[var(--teal)]
              "
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-[var(--beige)] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[var(--charcoal)] font-sans text-[10px] tracking-[0.2em] uppercase opacity-60">
          &copy; {new Date().getFullYear()} ELVARE. All rights reserved.
        </p>
        <div className="flex gap-8 text-[var(--charcoal)] font-sans text-[10px] tracking-[0.2em] uppercase font-medium">
          <Link to="#" className="relative group hover:text-[var(--teal)] transition-colors duration-300">
            Privacy Policy
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--teal)] transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link to="#" className="relative group hover:text-[var(--teal)] transition-colors duration-300">
            Terms of Service
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--teal)] transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer