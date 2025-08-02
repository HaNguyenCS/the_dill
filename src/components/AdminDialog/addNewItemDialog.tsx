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
import { FileUploader } from '@aws-amplify/ui-react-storage';
import { v4 as uuidv4 } from 'uuid';

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
    isPopular: false,
  });

  // const result = await uploadData({
  //   path: 'album/2024/1.jpg',
  //   data: newItem.file,
  //   options: {
  //     // Specify a target bucket using name assigned in Amplify Backend
  //     bucket: 'assignedNameInAmplifyBackend'
  //   }
  // }).result;

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
            <FileUploader
              acceptedFileTypes={['image/*']}
              path={`public/${uuidv4()}-${newItem.title}`}
              maxFileCount={1}
              isResumable
              onUploadSuccess={file => {
                setNewItem({
                  ...newItem,
                  image: file.key as string,
                })
              }}
              onUploadError={err => {
                console.error('Upload failed', err)
              }}
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