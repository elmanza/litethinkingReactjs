import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const URL_COMPANY = `https://litethinkingbackend.herokuapp.com/company`;

const CreateNewCompany = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async (formData) => {
    await fetch(URL_COMPANY, {
      method: 'POST',
      body: formData
    });
  }

  const onSubmit =async  (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', e.target[0].value);
    formData.append('direccion', e.target[1].value);
    formData.append('nit', e.target[2].value);
    formData.append('telefono', e.target[3].value);
    formData.append('companies', image);
    await fetchData(formData);
     handleClose();
     window.location.reload();
  };

  const handleImageChange = e => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <>
      <span onClick={handleShow}>+</span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='company-form' onSubmit={onSubmit}>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" name="nombre" />
            </div>
            <div>
              <label htmlFor="direccion">Address</label>
              <input type="text" name="direccion" />
            </div>
            <div>
              <label htmlFor="nit">NIT</label>
              <input type="text" name="nit" />
            </div>
            <div>
              <label htmlFor="telefono">Phone</label>
              <input type="text" name="telefono" />
            </div>
            <div>
              <label htmlFor="companies">imagen</label>
              <input type="file" name="companies" onChange={handleImageChange} />
            </div>
            <div>
              <button type="submit" disabled={image ? false : true}>Create</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateNewCompany;
