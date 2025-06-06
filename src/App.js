import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.tsx';
import Header from './components/Header/header.tsx';
// import Footer from './components/Footer/Footer';
import Menu from './pages/Menu/menu.tsx';
import { CartProvider } from './context/cartContext.tsx';
const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <CartProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/menu" element={<Menu/>} />
              <Route path="/about" element={<div>About Page Coming Soon</div>} />
              <Route path="/contact" element={<div>Contact Page Coming Soon</div>} />
              <Route path="/cart" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
        {/* <Footer /> */}
        </CartProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;