const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Welcome to CollegeOLX
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center" color="text.secondary">
        Buy and sell items within your college community
      </Typography>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" component={Link} to="/buy" size="large">
          Browse Products
        </Button>
        <Button variant="outlined" component={Link} to="/sell" size="large">
          Sell an Item
        </Button>
      </Box>
    </Container>
  );
};