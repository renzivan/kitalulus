import './index.scss';
import axios from 'axios';
import { Row } from '../../components';
import { useState, useEffect } from 'react';
import { Table as BTable, Button as BButton, Form as BForm } from 'react-bootstrap';

const Table = ({ movies, setMovies }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [rowValues, setRowValues] = useState({
    title: '',
    views: 0,
    genre: '',
    descriptions: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleClickFilter = () => {
    setIsFilter(!isFilter);
  }

  const handleInputSearch = (key, value) => {
    if (value.length === 0) {
      setFilteredMovies(movies);
    } else {
      const items = movies.filter(movie => {
        return movie[key].toLowerCase().includes(value.toLowerCase());
      });

      setFilteredMovies(items);
    }
  }

  const handleInputEdit = (evt) => {
    setRowValues({ ...rowValues, [evt.target.name]: evt.target.value });
  }

  const handeClickEdit = (key) => {
    setIsEdit(key);
    const movie = filteredMovies.find((_, idx) => idx === key);
    setRowValues(movie);
  }

  const handleClickSave = async (key) => {
    setIsEdit(null);

    try {
      const endpoint = `https://andywiranata-42555.firebaseio.com/test-frontend/items/${key}.json`;
      const saveMovie = await axios.put(endpoint, rowValues);
      const filtered = filteredMovies.map((movie, idx) => {
        if (idx === key) {
          return saveMovie.data;
        }

        return movie;
      })

      setMovies(filtered)
    } catch (err) {
      console.error('Error Fetching Data: ', err);
    }
  }

  const handleClickSort = (key) => {
    console.log('sort', filteredMovies[0])
    const sortedMovies = filteredMovies.sort((a, b) => {
      if ( a[key] < b[key] ){
        return -1;
      }
      if ( a[key] > b[key] ){
        return 1;
      }
      return 0;
    })
    console.log('sortedMovies: ', sortedMovies[0])

    // dli gaka change state ni movies
    setMovies(sortedMovies)
  }

  useEffect(() => {
    console.log('movies changed')
    setFilteredMovies(movies)
  }, [movies])

  useEffect(() => {
    if (
      rowValues.title &&
      rowValues.views &&
      rowValues.genre &&
      rowValues.descriptions
    ) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [rowValues])

  return (
    <div className="table-container">
      <BButton className="mb-3" variant="secondary" onClick={handleClickFilter}>Filter</BButton>
      <BTable striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th onClick={() => handleClickSort('title')}>Title</th>
            <th onClick={() => handleClickSort('views')}>View</th>
            <th onClick={() => handleClickSort('genre')}>Genre</th>
            <th onClick={() => handleClickSort('descriptions')}>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            isFilter &&
            <tr>
              <td></td>
              <td><BForm.Control type="text" placeholder="Search title" onInput={(evt) => handleInputSearch('title', evt.target.value)} /></td>
              <td></td>
              <td><BForm.Control type="text" placeholder="Search genre" onInput={(evt) => handleInputSearch('genre', evt.target.value)} /></td>
              <td style={{display: 'table-cell'}}></td>
              <td></td>
            </tr>
          }
          {
            filteredMovies.length > 0 && filteredMovies.map((movie, idx) => (
              <Row
                key={idx}
                idx={idx}
                isEdit={isEdit}
                isFormValid={isFormValid}
                movie={movie}
                rowValues={rowValues}
                handleInputEdit={(evt) => handleInputEdit(evt)}
                handleClickEdit={(idx) => handeClickEdit(idx)}
                handleClickSave={(idx) => handleClickSave(idx)}
              />
            ))
          }
        </tbody>
      </BTable>
    </div>
  );
}

export default Table;
