import React, { useState} from 'react';
import styles from './productCards.module.css';
import { Product } from '../../data/product';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddToCartDialog from '../AddToCartDialog/addToCartDialog.tsx';

interface ProductGridProps {
    products: Product[];
}

function ProductCard(product: Product) {
    const [openDialog, setOpenDialog] = useState(false);
    const getImageSource = (img: string | { default: string }) => {
        return typeof img === 'string' ? img : img.default;
    };

    return (
        <>
            <Card key={product.id} sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F5F0E1',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
            }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{
                            height: {
                                xs: 140,
                                sm: 200,
                                md: 250
                            },
                            objectFit: 'cover'
                        }}
                        image={getImageSource(product.image)}
                        alt={product.title}
                    />
                    <CardContent sx={{ flexGrow: 2 }}>
                        <Typography 
                        gutterBottom variant="h5" component="div"
                        sx={{ 
                            color: '#385D30',
                            fontFamily: 'Georgia, serif',
                            fontWeight: 550
                        }}>
                            {product.title}
                        </Typography>
                        <Typography variant="h6" sx={{ 
                            mt: 2, 
                            color: '#E86A33',
                            fontFamily: 'Georgia, serif',
                            fontWeight: 600
                        }}>
                            ${product.price}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                            color: '#666666',
                            fontFamily: 'Georgia, serif'
                        }}>
                            {product.description}
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ mt: 'auto', px: 2, pb: 2 }}>
                    <Button size="small" color="primary"
                        fullWidth
                        onClick={() => setOpenDialog(true)}
                        sx={{ 
                            color: '#385D30',
                            '&:hover': {
                                backgroundColor: '#385D30',
                                color: '#F5F0E1'
                            },
                            fontFamily: 'Georgia, serif',
                        }}>
                        Add to cart 
                        {product.isPopular && (
                            <FavoriteBorderRoundedIcon 
                                sx={{ 
                                    fontSize: '1rem',
                                    color: '#A3C586' 
                                }} 
                            />
                        )}
                    </Button>
                </CardActions>
            </Card>
            <AddToCartDialog 
                open= {openDialog}
                onClose={() => setOpenDialog(false)}
                product={product}
            />
        </>
    );
}

function ProductGrid( { products }: ProductGridProps) {
    console.log(products);
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