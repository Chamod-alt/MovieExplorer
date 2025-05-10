import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api';
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  if (!movie)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      p={4}
      sx={{
        background: 'linear-gradient(to right, #0f0f0f, #1f1f1f)',
        color: '#ffffff',
        minHeight: '100vh',
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          color: '#fff',
          borderColor: '#555',
          mb: 3,
          '&:hover': {
            borderColor: '#888',
            backgroundColor: '#222',
          },
        }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Poster */}
        <Grid item xs={12} md={4}>
          <Card sx={{ background: '#121212', borderRadius: 3 }}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{ borderRadius: 3 }}
            />
          </Card>
        </Grid>

        {/* Movie Info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="h6" color="gray" gutterBottom>
            {movie.release_date} &nbsp;|&nbsp; {movie.runtime} min &nbsp;|&nbsp; ⭐ {movie.vote_average}
          </Typography>

          <Box mt={2}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              {movie.overview}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Genres:
            </Typography>
            <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderColor: '#555',
                    color: '#fff',
                    backgroundColor: '#222',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetails;
