import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          color: '#333',
          borderColor: '#999',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>Favorites</Typography>

      {favorites.length === 0 ? (
        <Typography>No favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} onAddToFavorites={() => {}} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
