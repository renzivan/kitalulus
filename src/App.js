import './App.css';
import Table from './pages/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [movies, setMovies] = useState([]);

  const endpoint = 'https://andywiranata-42555.firebaseio.com/test-frontend/items.json';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const getMovies = await axios.get(endpoint);
        if (getMovies.data) {
          setMovies(getMovies.data);
        }
      } catch (err) {
        console.error('Error Fetching Data: ', err);
      }
    }
    fetchMovies();
  }, [])

  return (
    <div className="App">
      <Table movies={movies} setMovies={setMovies} />
    </div>
  );
}

export default App;
