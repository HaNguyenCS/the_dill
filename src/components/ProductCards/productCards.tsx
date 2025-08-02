import React, { useEffect, useState} from 'react';
import styles from './productCards.module.css';
import { Product } from '../../data/product';
import Box from '@mui/material/Box';
import AddToCartDialog from '../AddToCartDialog/addToCartDialog.tsx';
import { useAuthenticator } from '@aws-amplify/ui-react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { getUrl } from '@aws-amplify/storage';

interface ProductGridProps {
    products: Product[];
}

function ProductCard(product: Product) {
    const [openDialog, setOpenDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        async function loadImage() {
            if (product.image) {
                try {
                    const { url } = await getUrl({
                        path: product.image as string,
                        options: {
                            validateObjectExistence: true,
                        }
                    });
                    setImageUrl(url.toString());
                } catch (error) {
                    console.error('Error loading image:', error);
                }
            }
        }
        loadImage();
    }, [product.image]);

    const { user } = useAuthenticator();
    const isAuthenticated = Boolean(user);

    return (
        <>
            <div className={styles.card}>
                {product.isPopular && (
                <div className={styles.badge}>Best Seller</div>
                )}

                <img src={imageUrl} alt={product.title} className={styles.media} loading="lazy" />

                <div className={styles.content}>
                <h2 className={styles['card-title']}>{product.title}</h2>
                <div className={styles.price}>${product.price.toFixed(2)}</div>
                <p className={styles.description}>{product.description}</p>
                </div>

                <div className={styles.actions}>
                {isAuthenticated ? (
                    <button
                    className={styles['add-to-cart-button']}
                    onClick={() => console.log('View', product.id)}
                    >
                    <VisibilityRoundedIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }}/>
                    View
                    </button>
                ) : (
                    <button
                    className={styles['add-to-cart-button']}
                    onClick={() => setOpenDialog(true)}
                    >
                    Add to cart
                    </button>
                )}
                </div>
            </div>
            <AddToCartDialog 
                open= {openDialog}
                onClose={() => setOpenDialog(false)}
                product={product}
            />
        </>
    );
}

function ProductGrid( { products }: ProductGridProps) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
            },
            gap: 3,
            p: 2
        }}>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </Box>
    );
}

export default ProductGrid;