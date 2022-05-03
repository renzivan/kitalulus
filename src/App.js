import './App.css';
import Table from './components/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [movies, setMovies] = useState({});

  const endpoint = 'https://andywiranata-42555.firebaseio.com/test-frontend/items.json';

  useEffect(() => {
    const test = async () => {
      try {
        const getMovies = await axios.get(endpoint);
        setMovies(getMovies.data);
      } catch (err) {
        console.error('Error Fetching Data: ', err);
      }
    }
    test();
  }, [])

  return (
    <div className="App">
      <Table movies={movies} />
    </div>
  );
}

export default App;
