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
            minHeight: '100vh',
            bgcolor: '#FFF8E7',
            pt: 2,
        }}>
            <Box sx={{
                px: 2,
                width: '100%', 
                typography: 'body1',
            }}>
                {/* <TabContext value={value}>
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
                                    fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
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
                            <ProductGrid 
                                products={
                                    tab.value === 'all' 
                                        ? productFacade.getAllProducts()
                                        : productFacade.getProductsByCategory(tab.category!)
                                } 
                            />
                        </TabPanel>
                    ))}
                </TabContext> */}
                <TabContext value={value}>
                    <Box
                        sx={{
                            bgcolor: '#FFF8E7',
                            width: '100%', 
                            typography: 'body1',
                            px: 5, py: 0.5,
                            borderRadius: '24px',
                            display: 'inline-flex',
                            border: '3px solid #A3C586',
                        }}
                    >
                        <TabList
                        scrollButtons="auto" variant="scrollable"
                        onChange={handleChange}
                        textColor="inherit"
                        TabIndicatorProps={{ style: { display: 'none' } }}
                        >
                        {tabs.map(tab => (
                            <Tab
                            key={tab.value}
                            value={tab.value}
                            label={tab.label}
                            sx={{
                                px: 3,
                                textTransform: 'none',
                                fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                borderRadius: '20px',
                                bgcolor: value === tab.value
                                    ? '#385D30'
                                    : 'transparent',
                                color: value === tab.value
                                    ? '#FFF8E7'
                                    : '#385D30',
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    bgcolor: value === tab.value
                                        ? '#2E572A'
                                        : '#D8E4BC',
                                },
                            }}
                            />
                        ))}
                        </TabList>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        {tabs.map((tab) => (
                            <TabPanel
                            key={tab.value}
                            value={tab.value}
                            sx={{ p: 0 }}
                            >
                            <ProductGrid
                                products={
                                tab.value === 'all'
                                    ? productFacade.getAllProducts()
                                    : productFacade.getProductsByCategory(
                                        tab.category!
                                    )
                                }
                            />
                            </TabPanel>
                        ))}
                    </Box>
                </TabContext>
            </Box>
        </Box>
    );
}

export default Menu;