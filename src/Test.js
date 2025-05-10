import axios from 'axios';

const API_KEY = '2d2c413540e7c47977c31d3439ee60f5'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

axios.get(`${BASE_URL}/movie/550`, {
  params: {
    api_key: API_KEY
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
