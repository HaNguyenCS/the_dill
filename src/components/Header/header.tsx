import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useCart } from '../../context/cartContext.tsx';
import CartDialog from '../AddToCartDialog/cart.tsx';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { 
    label: <AddShoppingCartOutlinedIcon className={styles.cartIcon} />, 
    to: '/cart' 
  }
];

const titleIcon = require('../../asset/title2.webp');

function Header() {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <header className={styles.header}>
           
            <div className={styles.brand}>
                {/* <img
                src={titleIcon}
                alt="Dill Banh Mi Logo"
                className={styles.logo}
                /> */}
                <h1 className={styles.title}>The Dill Banh Mi</h1>
            </div>
            <nav className={styles.nav}>
                {navItems.map(item => (
                    <Link 
                        key={item.to} 
                        to={item.to === '/cart' ? '#' : item.to}
                        onClick={item.to === '/cart' ? () => setCartOpen(true) : undefined}
                        className={`${styles.link} ${item.to === '/cart' ? styles.cartLink : ''}`}
                        aria-label={item.to === '/cart' ? 'Shopping Cart' : item.label.toString()}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
        </header>
    );
};

export default Header;