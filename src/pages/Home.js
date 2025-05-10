
import React, { useEffect, useState ,navigate } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Grid,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { fetchTrendingMovies, searchMovies } from '../api';
import { useMovie } from '../context/MovieContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Home = ({ toggleTheme }) => {

  const navigate = useNavigate();

  const { setLastSearch } = useMovie();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(() => localStorage.getItem('lastSearch') || '');
  const [favorites, setFavorites] = useState([]);

  
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      const data = query
        ? await searchMovies(query, page)
        : await fetchTrendingMovies(page);
      setMovies((prev) => (page === 1 ? data : [...prev, ...data]));
    };
    loadMovies();
  }, [query, page]);

  const handleSearch = (text) => {
    setQuery(text);
    setPage(1);
    setLastSearch(text);
    localStorage.setItem('lastSearch', text);

    
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const updatedHistory = [text, ...history.filter((item) => item !== text)];
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory.slice(0, 10)));
  };

  const handleAddToFavorites = (movie) => {
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = [...existing, movie];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
    setMovies(movies.filter((m) => m.id !== movie.id));
  };

  const filteredMovies = movies.filter((movie) => {
    const matchGenre = selectedGenre
      ? movie.genre_ids?.includes(Number(selectedGenre))
      : true;
    const matchYear = selectedYear
      ? movie.release_date?.startsWith(selectedYear)
      : true;
    const matchRating = selectedRating
      ? movie.vote_average >= Number(selectedRating)
      : true;
    return matchGenre && matchYear && matchRating;
  });

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Movie Explorer</Typography>
        <Switch onChange={toggleTheme} />
      </Box>


      {/*,,,,,,,,,,,, */}

      <Box display="flex" alignItems="center" gap={2}>
    <Button
      variant="outlined"
      onClick={() => navigate('/favorites')}
      sx={{ textTransform: 'none' }}
    >
      Go to Favorites
    </Button>
    
  </Box>
<br />
      <SearchBar onSearch={handleSearch} />

      {/* Filters */}
      <Box display="flex" gap={2} mb={2} mt={1}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="28">Action</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="27">Horror</MenuItem>
            <MenuItem value="10749">Romance</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(20)].map((_, i) => {
              const year = 2024 - i;
              return (
                <MenuItem key={year} value={year.toString()}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Rating</InputLabel>
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            label="Rating"
          >
            <MenuItem value="">All</MenuItem>
            {[9, 8, 7, 6, 5].map((r) => (
              <MenuItem key={r} value={r.toString()}>
                {r}+
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      
      <Grid container spacing={2}>
        {filteredMovies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <MovieCard movie={movie} onAddToFavorites={handleAddToFavorites} />
          </Grid>
        ))}
      </Grid>

      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" onClick={() => setPage(page + 1)}>
          Load More
        </Button>
      </Box>


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
    </Box>
  );
};

export default Home;

