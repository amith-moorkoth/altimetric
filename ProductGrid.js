import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  Box,
  TextField,
} from '@mui/material';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?_limit=${productsPerPage}&_page=${currentPage}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Grid
      </Typography>
      
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={2}>
        {products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.url}
                alt={product.title}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2">Price: $10</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ProductGrid;
