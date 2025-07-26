import React, { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { Product } from '../../data/product';
import ProductGrid from '../../components/ProductCards/productCards.tsx';
import styles from './adminPanel.module.css';
import { productFacade } from '../../components/ProductCards/product.facade.ts';
import CircularProgress from '@mui/material/CircularProgress';
import AddNewItemDialog from '../../components/AdminDialog/addNewItemDialog.tsx';
import { menuService } from '../../service/menuService.ts';

export default function AdminPanel() {
  const { signOut } = useAuthenticator();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    productFacade.initialize().then(() => {
      setProducts(productFacade.getAllProducts());
      setLoading(false);
    });
  }, []);

  const handleAddProduct = (product: Omit<Product,'id'>) => {
    setLoading(true);
    menuService.addProduct(product).subscribe({
      next: created => {
        if (created) {
          productFacade.refreshProducts().then(() => {
            setProducts(productFacade.getAllProducts());
          });
        }
      },
      error: console.error,
      complete: () => setLoading(false),
    });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    // TODO
  };

  const handleDelete = (product: Product) => {
    // await menuService.deleteProduct(product.id);
    // productFacade.refreshProducts().then(() => setProducts(productFacade.getAllProducts()));
  };

  if (loading) {
    return <CircularProgress color="success" />;
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1>Admin Panel</h1>
        <div className={styles.actions}>
          <Button
            variant="contained"
            sx={{backgroundColor: '#A3C586', color: '#fff' }}
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add New Product
          </Button>
          <Button
            variant="outlined"
            sx={{ color: '#A3C586', borderColor: '#A3C586'}}
            startIcon={<LogoutIcon />}
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <ProductGrid products={products}/>
      <AddNewItemDialog 
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
