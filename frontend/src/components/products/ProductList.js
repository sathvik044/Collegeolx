import { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { productApi } from '../../services/api';  // Update this line
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await productApi.getAllProducts();  // Update this line
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4 }}>Available Products</Typography>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;