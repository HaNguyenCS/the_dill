import React from 'react';
import styles from './home.module.css';
import { motion } from 'framer-motion';
// import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/ProductCards/productCards.tsx';
import { productFacade } from '../../components/ProductCards/product.facade.ts';
import Box from '@mui/material/Box';

const banhmiImage = require('../../asset/Banh-Mi-Thit-Nuong.jpg');

function Home() {
  // const buttonRef = React.useRef<HTMLButtonElement>(null);
  // const isInView = useInView(buttonRef, { once: false });
  const marqueeText = 'Address: 32 Coleville Rd, North York, Ontario  |  Contact: 416-476-7244  |  Experience the authentic taste of Vietnam with our delicious banh mi and refreshing drinks.  ';
  
  return (
      <div className={styles.home}>
        <section className={styles.welcome}>
            {/* <button ref={buttonRef} className={styles.orderButton}
             style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }} /> */}
          <Link to ="/menu">
            <button className={styles.orderButton}>
              Order Now
            </button>
          </Link>
          <img
            src={banhmiImage}
            alt="Dill Banh Mi Logo"
            className={styles.logo}
            />
          <h1>Taste the Flavours Of Vietnam</h1>
          <div className={styles.marqueeContainer}>
            <motion.div
              className={styles.marqueeContent}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: 'linear',
              }}
            >
              <span className={styles.marqueeText}>
                {marqueeText}
              </span>
            </motion.div>
          </div>
        </section>
        <div className={styles.featuredProducts}>
        <h2>BEST SELLERS</h2>
        <ProductGrid products={productFacade.getPopularProducts()} />
      </div>
    </div>
  );
};

export default Home;