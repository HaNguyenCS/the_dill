import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../../context/cartContext.tsx';

interface CartDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDialog({ open, onClose }: CartDialogProps) {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#F5F0E1',
                    fontFamily: 'Georgia, serif'
                }
            }}
        >
            <DialogTitle sx={{ color: '#385D30', borderBottom: '1px solid #385D30' }}>
                Your Cart
            </DialogTitle>
            <DialogContent>
                {cart.items.length === 0 ? (
                    <Typography sx={{ color: '#666666', my: 2 }}>
                        Your cart is empty
                    </Typography>
                ) : (
                    cart.items.map(item => (
                        <Box key={item.id} sx={{ 
                            py: 2, 
                            borderBottom: '1px solid #e0e0e0',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Typography sx={{ color: '#385D30', fontWeight: 600 }}>
                                    {item.product.title} x {item.quantity}
                                </Typography>
                                {item.selectedSides && (
                                    <Typography sx={{ color: '#666666', fontSize: '0.9rem' }}>
                                        Sides: {item.selectedSides.join(', ')}
                                    </Typography>
                                )}
                                {item.notes && (
                                    <Typography sx={{ color: '#666666', fontSize: '0.9rem' }}>
                                        Notes: {item.notes}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography sx={{ color: '#E86A33', fontWeight: 600 }}>
                                    ${item.totalPrice.toFixed(2)}
                                </Typography>
                                <IconButton 
                                    onClick={() => removeFromCart(item.id)}
                                    sx={{ color: '#666666' }}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                )}
                {cart.items.length > 0 && (
                    <Box sx={{ mt: 3, textAlign: 'right' }}>
                        <Typography sx={{ color: '#385D30', fontWeight: 600 }}>
                            Total: ${cart.totalAmount.toFixed(2)}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} sx={{ color: '#666666' }}>
                    Close
                </Button>
                {cart.items.length > 0 && (
                    <>
                        <Button 
                            onClick={clearCart}
                            sx={{ color: '#E86A33' }}
                        >
                            Clear Cart
                        </Button>
                        <Button 
                            variant="contained"
                            sx={{ 
                                backgroundColor: '#385D30',
                                color: '#F5F0E1',
                                '&:hover': {
                                    backgroundColor: '#A3C586',
                                }
                            }}
                        >
                            Checkout
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}