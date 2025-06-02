import React from 'react';
import styles from './productCards.module.css';
import { Product } from '../../data/product';

// export interface ProductCardProps extends Omit<Product, 'id' | 'category' | 'isPopular'> {
//   onClick?: () => void;
// }

function ProductCard({
    id,
    image,
    title,
    description,
    price,
    category,
    isPopular,
}: Product) {
    const getImageSource = (img: string | { default: string }) => {
        return typeof img === 'string' ? img : img.default;
    };
    return (
        <div className={styles.productCard}>
            <img src={getImageSource(image)} alt={title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productDescription}>{description}</p>
            <span className={styles.productPrice}>${price.toFixed(2)}</span>
        </div>
    );
}

export default ProductCard;