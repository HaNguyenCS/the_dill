import React from 'react';
import styles from './productCards.module.css';
import { Product } from '../../data/product';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

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
        <Card key={id} sx={{ 
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
                    image={getImageSource(image)}
                    alt={title}
                />
                <CardContent sx={{ flexGrow: 2 }}>
                    <Typography 
                    gutterBottom variant="h5" component="div"
                    sx={{ 
                        color: '#385D30',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 550
                    }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        mt: 2, 
                        color: '#E86A33',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 600
                    }}>
                        ${price}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        color: '#666666',
                        fontFamily: 'Georgia, serif'
                    }}>
                        {description}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ mt: 'auto', px: 2, pb: 2 }}>
                <Button size="small" color="primary"
                fullWidth
                sx={{ 
                    color: '#385D30',
                    '&:hover': {
                        backgroundColor: '#385D30',
                        color: '#F5F0E1'
                    },
                    fontFamily: 'Georgia, serif',
                }}>
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;