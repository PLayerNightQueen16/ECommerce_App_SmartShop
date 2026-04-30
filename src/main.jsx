import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. ADD THIS LINE (Make sure the path matches your file name!)
import { DataProvider } from './context/DataContext.jsx'; 

import { CartProvider } from './context/CartContext.jsx'; 
import { WishlistProvider } from './context/WishlistContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Now it knows what DataProvider is! */}
    <DataProvider> 
      <CartProvider>
        <WishlistProvider> 
          <App />
        </WishlistProvider>
      </CartProvider>
    </DataProvider>
  </React.StrictMode>,
);