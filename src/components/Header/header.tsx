import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: <AddShoppingCartOutlinedIcon />, to: '/cart' }
];

// type HeaderProps = {};
const titleIcon = require('../../asset/title2.webp');

function Header() {
    return (
        <header className={styles.header}>
           
            <div className={styles.brand}>
                <img
                src={titleIcon}
                alt="Dill Banh Mi Logo"
                className={styles.logo}
                />
                <h1 className={styles.title}>The Dill Banh Mi</h1>
            </div>
            <nav className={styles.nav}>
                {navItems.map(item => (
                    <Link 
                        key={item.to} 
                        to={item.to} 
                        className={styles.link}
                        aria-label={item.to === '/cart' ? 'Shopping Cart' : item.label.toString()}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    )
};

export default Header;