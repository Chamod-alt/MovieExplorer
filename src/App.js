// App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { ColorModeProvider } from './ThemeContext'; // import the theme context
import Adminchanges from './Admin_changemove'

const App = () => {
  return (
    <ColorModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ColorModeProvider>
  );
};

export default App;
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import { MovieProvider } from './context/MovieContext';
import { darkTheme, lightTheme } from './theme';
import useLocalStorage from './utils/useLocalStorage';
import Login from './Login'

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  return (
    <MovieProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <Routes>
          <Route path="/" element={<Login />} />
           {/* <Route path="/" element={<Home toggleTheme={() => setDarkMode(!darkMode)} />} /> */}
           <Route path="/Home" element={<Home toggleTheme={() => setDarkMode(!darkMode)} />} /> 
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MovieProvider>
  );
}

export default App;

