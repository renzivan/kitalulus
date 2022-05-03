import './table.scss';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table as BTable, Button as BButton, Form as BForm } from 'react-bootstrap';

const Table = ({ movies }) => {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [modal, setModal] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [rowValues, setRowValues] = useState({
    title: '',
    views: 0,
    genre: '',
    descriptions: ''
  });

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

  const handleClickModal = (key) => {
    setModal(key);
  }

  const handleChangeEdit = (evt) => {
    setRowValues({ ...rowValues, [evt.target.name]: evt.target.value });
  }

  const handeClickEdit = (key) => {
    setIsEdit(key);
    const movie = filteredMovies.find((_, idx) => idx === key);
    setRowValues(movie);
  }

  const handeClickSave = async (key) => {
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

      setFilteredMovies(filtered)
    } catch (err) {
      console.error('Error Fetching Data: ', err);
    }
  }

  useEffect(() => {
    setFilteredMovies(movies)
  }, [movies])

  return (
    <div className="table-container">
      <BButton className="mb-3" variant="secondary" onClick={handleClickFilter}>Filter</BButton>
      <BTable striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>View</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            isFilter &&
            <tr>
              <td></td>
              <td><BForm.Control type="text" onInput={(evt) => handleInputSearch('title', evt.target.value)} /></td>
              <td></td>
              <td><BForm.Control type="text" onInput={(evt) => handleInputSearch('genre', evt.target.value)} /></td>
              <td style={{display: 'table-cell'}}></td>
              <td></td>
            </tr>
          }
          {
            filteredMovies.length > 0 && filteredMovies.map((movie, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {
                    isEdit !== idx ?
                    <span>{movie.title}</span> :
                    <input type="text" name="title" value={rowValues.title} onChange={(evt) => handleChangeEdit(evt)} />
                  }
                </td>
                <td>
                  {
                    isEdit !== idx ?
                    <span>{movie.views}</span> :
                    <input type="number" name="views" value={rowValues.views} onChange={(evt) => handleChangeEdit(evt)} />
                  }
                </td>
                <td>
                  {
                    isEdit !== idx ?
                    <span>{movie.genre}</span> :
                    <input type="text" name="genre" value={rowValues.genre} onChange={(evt) => handleChangeEdit(evt)} />
                  }
                </td>
                <td>
                  {
                    isEdit !== idx ?
                    (<>
                      <span>{movie.descriptions}</span>
                      <div onClick={() => handleClickModal(idx)}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                      </div>
                      <Modal description={movie.descriptions} show={modal === idx} onClick={() => setModal(null)} />
                    </>) :
                    <textarea name="descriptions" value={rowValues.descriptions} onChange={(evt) => handleChangeEdit(evt)} />
                  }
                </td>
                <td>
                  {
                    isEdit !== idx ?
                      <span onClick={() => handeClickEdit(idx)}>Edit</span> :
                      <span onClick={() => handeClickSave(idx)}>Save</span>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </BTable>
    </div>
  );
}

export default Table;
