import './table.scss';
// import { useState } from 'react';

const Table = ({ movies }) => {
  // const [name, setName] = useState('renz');
  // const handleClick = () => {
  //   setName('renz ivan');
  // }

  return (
    <div className="table">
      {
        Object.entries(movies).map(([key, movie]) => (
          <div className="" key={key}>
            {movie.title}
          </div>
        ))
      }
      {/* <div className="table-row">
        <div className="table-column">No</div>
        <div className="table-column">Title</div>
        <div className="table-column">View</div>
      </div>
      <button onClick={handleClick}>Click</button> */}
    </div>
  );
}

export default Table;
