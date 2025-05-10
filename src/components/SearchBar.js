/*import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box my={2} component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>Search</Button>
    </Box>
  );
};

export default SearchBar;
*/

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(stored);
    setFiltered(stored);
  }, []);

  useEffect(() => {
    if (!text) {
      setFiltered(history); // still update filtered but won't show
    } else {
      setFiltered(
        history.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
      );
    }
  }, [text, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onSearch(trimmed);

      // Save to localStorage if not already in history
      if (!history.includes(trimmed)) {
        const updatedHistory = [trimmed, ...history].slice(0, 10); // optional limit to 10
        setHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      }
    }
  };

  const handleSuggestionClick = (value) => {
    setText(value);
    onSearch(value);
  };

  return (
    <Box position="relative" mb={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Search for a movie"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      {text.trim() && filtered.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            width: '100%',
            zIndex: 10,
            maxHeight: 250,
            overflowY: 'auto',
            mt: 1,
            borderRadius: 2,
            backgroundColor: '#1c1c1c',
            color: 'white',
          }}
        >
          <List dense>
            {filtered.map((item, idx) => (
              <ListItem
                key={idx}
                disablePadding
                sx={{
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                <ListItemButton onClick={() => handleSuggestionClick(item)}>
                  <Typography sx={{ px: 1, py: 0.5 }}>{item}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;

