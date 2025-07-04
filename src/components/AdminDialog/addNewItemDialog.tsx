import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Product, ProductCategory } from '../../data/product.ts';

interface AddNewItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export default function AddNewItemDialog({ open, onClose, onSubmit }: AddNewItemDialogProps) {
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    category: ProductCategory.BANH_MI,
    image: '',
    isPopular: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...newItem,
      price: Number(newItem.price)
    });
    onClose();
  };

  const handlePopularChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      isPopular: event.target.checked
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        fontFamily: 'Georgia, serif',
        color: '#2E7D32'
      }}>
        Add New Menu Item
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              required
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              required
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value as ProductCategory })}
                label="Category"
              >
                {Object.values(ProductCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.replace('-', ' ').toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Image URL"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              required
              fullWidth
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={newItem.isPopular}
                  onChange={handlePopularChange}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#2E7D32',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.04)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#2E7D32',
                    },
                  }}
                />
              } 
              label="Popular Item"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#666666',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ 
              backgroundColor: '#2E7D32',
              '&:hover': { backgroundColor: '#1B5E20' }
            }}
          >
            Add Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}