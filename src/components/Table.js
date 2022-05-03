import './table.scss';
import Modal from './Modal';
import { useState, useEffect } from 'react';

const Table = ({ movies }) => {

  const [filteredMovies, setFilteredMovies] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [modal, setModal] = useState(null)

  const handleClickFilter = () => {
    setIsFilter(!isFilter)
  }

  const handleInputSearch = (e, key) => {
    if (e.target.value.length === 0) {
      setFilteredMovies(movies)
    } else {
      const x = filteredMovies.filter(movie => {
        return movie[key].toLowerCase().includes(e.target.value.toLowerCase())
      })

      setFilteredMovies(x)
    }
  }

  const handleClickModal = (key) => {
    setModal(key)
  }

  const handeClickEdit = (key) => {
    console.log('handeClickEdit: ', key)
  }

  useEffect(() => {
    setFilteredMovies(movies)
  }, [movies])

  return (
    <div>
      <button onClick={handleClickFilter}>filter</button>
      <table>
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
              <td><input type="text" onInput={(evt) => handleInputSearch(evt, 'title')} /></td>
              <td></td>
              <td><input type="text" onInput={(evt) => handleInputSearch(evt, 'genre')} /></td>
              <td></td>
              <td></td>
            </tr>
          }
          {
            filteredMovies.length > 0 && filteredMovies?.map((movie, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{movie.title}</td>
                <td>{movie.views}</td>
                <td>{movie.genre}</td>
                <td>
                  <div>{movie.descriptions}</div>
                  <div onClick={() => handleClickModal(idx)}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                  </div>
                  { modal === idx && <Modal description={movie.descriptions} onClick={() => setModal(null)} /> }
                </td>
                <td>
                  <span onClick={() => handeClickEdit(idx)}>Edit</span>
                </td>
              </tr>
            ))
            // Object.entries(filteredMovies).map(([key, movie], idx) => (
            //   <tr key={key}>
            //     <td>{idx + 1}</td>
            //     <td>{movie.title}</td>
            //     <td>{movie.views}</td>
            //     <td>{movie.genre}</td>
            //     <td>
            //       <div>{movie.descriptions}</div>
            //       <div onClick={() => handleClickModal(key)}>
            //         <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
            //       </div>
            //       { modal === key && <Modal description={movie.descriptions} onClick={() => setModal(null)} /> }
            //     </td>
            //     <td>
            //       <span onClick={() => handeClickEdit(key)}>Edit</span>
            //     </td>
            //   </tr>
            // ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
