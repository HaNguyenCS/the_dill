import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react';

import { productFacade } from '../../components/ProductCards/product.facade.ts';
import ProductGrid from '../../components/ProductCards/productCards.tsx';
import { ProductCategory } from '../../data/product.ts';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CircularProgress from '@mui/material/CircularProgress';

function Menu() {
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = React.useState('all');

    useEffect(() => {
        async function init() {
            await productFacade.initialize();
            setIsLoading(false);
        }
        init();
    }, []);
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const tabs: { label: string; value: string; category?: ProductCategory }[] = [
        { label: 'All', value: 'all' },
        { label: 'Banh Mi', value: 'banh-mi', category: ProductCategory.BANH_MI },
        { label: 'Drinks', value: 'drinks', category: ProductCategory.DRINK },
        { label: 'Sides', value: 'sides', category: ProductCategory.SIDE },
        { label: 'Desserts', value: 'desserts', category: ProductCategory.DESSERT },
        { label: 'Combo', value: 'combo', category: ProductCategory.COMBO },
    ];

    if (isLoading) {
        return <CircularProgress color="success" />;
    }

    return (
        <Box sx={{ 
            width: '100%', 
            typography: 'body1',
            backgroundColor: '#FFF8E7' // Light beige background
        }}>
            <TabContext value={value}>
                <Box sx={{ 
                    borderBottom: 1, 
                    borderColor: '#385D30', // Dark green border
                    backgroundColor: '#A3C586' // Light green background
                }}>
                    <TabList 
                        scrollButtons="auto" variant="scrollable" aria-label="menu tabs"
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#385D30"
                            }
                        }}
                        sx={{
                            '& .MuiTab-root': {
                                color: '#385D30',
                                fontFamily: 'Georgia, serif',
                                fontSize: {
                                    xs: '0.8rem',
                                    sm: '1rem'
                                },
                                fontWeight: 600,
                                '&.Mui-selected': {
                                    color: '#385D30',
                                    fontWeight: 700
                                }
                            }
                        }}
                    >
                        {tabs.map(tab => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                    </TabList>
                </Box>
                {tabs.map(tab => (
                    <TabPanel key={tab.value} value={tab.value} sx={{ padding: 3 }}>
                        <div style={{color: '#666666', fontFamily: 'Georgia, serif', fontSize: '1rem', marginBottom: '1rem'}}>
                            <FavoriteBorderRoundedIcon 
                            sx={{ 
                                fontSize: '1rem',
                                color: '#A3C586' 
                            }}
                        /> = Best sellers
                        </div>
                        <ProductGrid 
                            products={
                                tab.value === 'all' 
                                    ? productFacade.getAllProducts()
                                    : productFacade.getProductsByCategory(tab.category!)
                            } 
                        />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}

export default Menu;