import React, { useState } from 'react' // 1. Added useState
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Wishlist from './pages/Wishlist'
import Products from './pages/Products'
import Home from './pages/Home'
import Cart from './pages/Cart'
import SingleProduct from './pages/SingleProduct'
import About from './pages/About'
import Checkout from './pages/Checkout'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  // 2. LOCATION STATE
  const [location, setLocation] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(false)

  // 3. GEOLOCATION LOGIC
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
            if (!response.ok) {
              throw new Error(`Location service failed with status ${response.status}`)
            }
            const data = await response.json()
            const address = data.address || {}
            setLocation({
              county: address.city || address.town || address.village || address.county || "Unknown",
              state: address.state || "Detected"
            })
          } catch (error) {
            console.error("Error fetching location details:", error)
            alert("Couldn't detect your location right now. Please try again.")
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
          alert("Please enable location access in your browser settings.")
        }
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  return (
  <div className="bg-[#07051A] min-h-screen text-white">
    <BrowserRouter>
      
      {/* Toast now matches dark theme */}
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        theme="dark" 
      />

      {/* Navbar */}
      <Navbar 
        location={location} 
        getLocation={getLocation} 
        openDropdown={openDropdown} 
        setOpenDropdown={setOpenDropdown} 
      />
      
      {/* Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/products/:id' element={<SingleProduct />} /> 
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route 
          path="*" 
          element={
            <div className="pt-40 text-center text-white">
              Page Not Found
            </div>
          } 
        />
      </Routes>
      
      {/* Footer */}
      <Footer/>

    </BrowserRouter>
  </div>
)
}

export default App