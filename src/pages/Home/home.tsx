import React from 'react';
import styles from './home.module.css';

function Home() {
    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <h1>Welcome to Our Banh Mi and Vietnamese Drink Shop!</h1>
                <p>Experience the authentic taste of Vietnam with our delicious banh mi and refreshing drinks.</p>
            </section>
            <div className={styles.featuredProducts}>
                <h2>Featured Products</h2>
            </div>
        </div>
    );
};

export default Home;