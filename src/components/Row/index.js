import { EditIcon, SaveIcon, WarningIcon } from '../../assets/icons'; 
import { Modal } from '../../components';
import { Form as BForm, Button as BButton } from 'react-bootstrap';
import { useState } from 'react';

const Row = ({idx, isEdit, isFormValid, movie, rowValues, handleInputEdit, handleClickEdit, handleClickSave}) => {
  const [modal, setModal] = useState(null);

  const handleClickModal = (key) => {
    setModal(key);
  }

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>
        {
          isEdit !== idx ?
          <span>{movie.title}</span> :
          <BForm.Control
            isValid={rowValues.title}
            isInvalid={!rowValues.title}
            type="text"
            name="title"
            value={rowValues.title}
            onInput={(evt) => handleInputEdit(evt)}
          />
        }
      </td>
      <td>
        {
          isEdit !== idx ?
          <span>{movie.views}</span> :
          <BForm.Control
            isValid={rowValues.views}
            isInvalid={!rowValues.views}
            type="number"
            name="views"
            value={rowValues.views}
            onInput={(evt) => handleInputEdit(evt)}
          />
        }
      </td>
      <td>
        {
          isEdit !== idx ?
          <span>{movie.genre}</span> :
          <BForm.Control
            isValid={rowValues.genre}
            isInvalid={!rowValues.genre}
            type="text"
            name="genre"
            value={rowValues.genre}
            onInput={(evt) => handleInputEdit(evt)}
          />
        }
      </td>
      <td>
        {
          isEdit !== idx ?
          (<div>
            <span>{movie.descriptions}</span>
            <div onClick={() => handleClickModal(idx)}>
              <WarningIcon />
            </div>
            <Modal description={movie.descriptions} show={modal === idx} onClick={() => setModal(null)} />
          </div>) :
          <BForm.Control
            isValid={rowValues.descriptions}
            isInvalid={!rowValues.descriptions}
            as="textarea"
            name="descriptions"
            rows={2}
            value={rowValues.descriptions}
            onChange={(evt) => handleInputEdit(evt)}
          />
        }
      </td>
      <td>
        {
          isEdit !== idx ?
            <BButton className="d-flex m-auto" onClick={() => handleClickEdit(idx)}><EditIcon /></BButton> :
            <BButton className="d-flex m-auto" variant="success" disabled={!isFormValid} onClick={() => handleClickSave(idx)}><SaveIcon /></BButton>
        }
      </td>
    </tr>
  );
}

export default Row;
