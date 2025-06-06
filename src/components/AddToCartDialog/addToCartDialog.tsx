import * as React from 'react';
import { useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, FormLabel,
    FormControlLabel, Box, Typography, Checkbox,
    IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Product } from '../../data/product';
import { productFacade } from '../ProductCards/product.facade.ts';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '../../context/cartContext.tsx';

interface AddToCartDialogProps {
    open: boolean;
    onClose: () => void;
    product: Product;
}

export default function AddToCartDialog({ open, onClose, product }: AddToCartDialogProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSides, setSelectedSides] = useState<string[]>([]);
    const [notes, setNotes] = useState('');
    const { addToCart } = useCart();

    const sideProducts = productFacade.getProductsByCategory('side');

    const calculateTotal = () => {
        const basePrice = product.price * quantity;
        const sidesTotal = selectedSides.reduce((total, sideName) => {
            const sideProduct = sideProducts.find(s => s.title === sideName);
            return total + (sideProduct?.price || 0)* quantity;
        }, 0);
        return (basePrice + sidesTotal).toFixed(2);
    };

    const handleAddToCart = () => {
        addToCart({
            id: uuidv4(),
            product,
            quantity,
            selectedSides,
            notes,
            totalPrice: Number(calculateTotal())
        });
        handleClose();
    };

    const handleQuantityChange = (operation: 'increment' | 'decrement') => {
        if (operation === 'increment') {
            setQuantity(prev => prev + 1);
        } else {
            setQuantity(prev => Math.max(1, prev - 1));
        }
    };

    const resetForm = () => {
        setQuantity(1);
        setSelectedSides([]);
        setNotes('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#F5F0E1',
                }
            }}
        >
            <DialogTitle sx={{ 
                color: '#385D30',
                borderBottom: '1px solid #385D30',
                mb: 2,
                fontWeight: 600,
                fontFamily: 'Georgia, serif',
            }}>
                {product.title}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    mb: 3 
                }}>
                    <Box sx={{ 
                        width: { xs: '100%', sm: '200px' },
                        height: { xs: '200px', sm: '200px' }
                    }}>
                        <img
                            src={typeof product.image === 'string' ? product.image : product.image.default}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ color: '#666666', mb: 2, fontFamily: 'Georgia, serif' }}>
                            {product.description}
                        </Typography>
                        <Typography sx={{ 
                            color: '#E86A33',
                            fontWeight: 600,
                            fontSize: '1.2rem'
                        }}>
                            ${product.price}
                        </Typography>
                    </Box>
                </Box>

                {product.category === 'banh-mi' && sideProducts.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: '#385D30', mb: 1, fontFamily: 'Georgia, serif' }}>
                            Extra (Optional)
                        </FormLabel>
                        <Box sx={{ display: 'flex', flexDirection: 'column', color: '#385D30' }}>
                            {sideProducts.map((side) => (
                                <FormControlLabel
                                    key={side.id}
                                    control={
                                        <Checkbox 
                                            checked={selectedSides.includes(side.title)}
                                            onChange={() => {
                                                setSelectedSides(prev => 
                                                    prev.includes(side.title)
                                                        ? prev.filter(s => s !== side.title)
                                                        : [...prev, side.title]
                                                );
                                            }}
                                            sx={{ 
                                                color: '#385D30'
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            width: '100%',
                                            color: '#666666',
                                            fontFamily: 'Georgia, serif'
                                        }}>
                                            <span>{side.title} </span>
                                            <span> (+${side.price.toFixed(2)})</span>
                                        </Box>
                                    }
                                />
                            ))}
                        </Box>
                    </FormControl>
                )}

                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                    mb: 3
                }}>
                    <Typography sx={{ color: '#385D30', fontFamily: 'Georgia, serif' }}>Quantity:</Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <IconButton 
                            onClick={() => handleQuantityChange('decrement')}
                            disabled={quantity <= 1}
                            sx={{ 
                                color: quantity <= 1 ? '#cccccc' : '#385D30',
                                padding: '4px'
                            }}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Typography sx={{ 
                            minWidth: '40px', 
                            textAlign: 'center',
                            color: '#385D30',
                            fontWeight: 600
                        }}>
                            {quantity}
                        </Typography>
                        <IconButton 
                            onClick={() => handleQuantityChange('increment')}
                            sx={{ 
                                color: '#385D30',
                                padding: '4px'
                            }}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>

                <TextField
                    label="Special Instructions (Optional)"
                    multiline
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                    placeholder="Add any special requests here..."
                    sx={{
                        '& label.Mui-focused': {
                            color: '#385D30',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#385D30',
                            fontFamily: 'Georgia, serif'
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#385D30',
                                fontFamily: 'Georgia, serif'
                            }
                        },
                        fontFamily: 'Georgia, serif'
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} sx={{ color: '#666666' }}>
                    Cancel
                </Button>
                <Button 
                    onClick={handleAddToCart}
                    variant="contained"
                    disabled={quantity < 1}
                    sx={{ 
                        backgroundColor: quantity < 1 ? '#cccccc' : '#385D30',
                        color: '#F5F0E1',
                        '&:hover': {
                            backgroundColor: quantity < 1 ? '#cccccc' : '#A3C586',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#cccccc',
                            color: '#666666'
                        }
                    }}
                >
                    Add to Cart - ${calculateTotal()}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
