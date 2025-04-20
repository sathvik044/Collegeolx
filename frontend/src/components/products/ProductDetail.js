import { Container, Typography, Card, CardMedia, Box } from '@mui/material';

const ProductDetail = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image="https://via.placeholder.com/300"
          alt="Product"
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Product Title</Typography>
          <Typography variant="h6" color="primary">$99.99</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Product description goes here...
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default ProductDetail;