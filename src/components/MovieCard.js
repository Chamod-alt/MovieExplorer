

import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Box,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMovieTrailer } from '../api';

const MovieCard = ({ movie, onAddToFavorites }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleWatchTrailer = async (e) => {
    e.stopPropagation(); // prevent card click navigation
    const key = await getMovieTrailer(movie.id);
    if (key) {
      setTrailerKey(key);
      setOpen(true);
    } else {
      alert('Trailer not available.');
    }
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation(); // prevent card click navigation
    onAddToFavorites(movie);
  };

  return (
    <>
      <Card
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{
          cursor: 'pointer',
          width: 310,
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2">
            {new Date(movie.release_date).getFullYear()}
          </Typography>
          <Typography variant="body2">Rating: {movie.vote_average}</Typography>
        </CardContent>
        <Box sx={{ p: 1 }}>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleAddToFavorites}>
              Add to Favorites
            </Button>
            <Button size="small" onClick={handleWatchTrailer}>
              Watch Trailer
            </Button>
          </CardActions>
        </Box>
      </Card>

      {/* Trailer Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogContent>
          {trailerKey ? (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <Typography>No trailer found.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieCard;
