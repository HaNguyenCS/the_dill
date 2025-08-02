import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.tsx';
import Header from './components/Header/header.tsx';
import Menu from './pages/Menu/menu.tsx';
import { CartProvider } from './context/cartContext.tsx';
import { Authenticator } from '@aws-amplify/ui-react';
import AdminPage from './pages/Admin/adminAuth.tsx';
import About from './pages/About/about.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Authenticator.Provider>
          <CartProvider>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/menu" element={<Menu/>} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/contact" element={<div>Contact Page Coming Soon</div>} /> */}
                <Route path="/cart" element={<div>404 - Page Not Found</div>} />
                <Route 
                  path="/adminLogin" 
                  element={
                    <Authenticator.Provider>
                      <AdminPage />
                    </Authenticator.Provider>
                  } 
                />
              </Routes>
            </main>
            {/* <Footer /> */}
          </CartProvider>
        </Authenticator.Provider>

      </div>
    </BrowserRouter>
  );
};

export default App;