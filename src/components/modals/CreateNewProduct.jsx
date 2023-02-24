import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const URL_ARTICLE = `https://litethinkingbackend.herokuapp.com/article`;

const CreateNewProduct = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async (obj_data) => {
    await fetch(URL_ARTICLE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj_data)
    });
  }

  const onSubmit =async  (e) => {
    e.preventDefault();
    await fetchData({
      name: e.target[0].value,
      description: e.target[1].value,
      image: e.target[2].value,
      stock: e.target[3].value,
      price: e.target[4].value,
      company_id: props.companyid
     });
     handleClose();
     window.location.reload();
  };

  return (
    <>
      <button type="button" className='new-article'  onClick={handleShow}>+</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='company-form' onSubmit={onSubmit}>
            <div>
              <label htmlFor="name">Product name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input type="text" name="description" />
            </div>
            <div>
              <label htmlFor="image">URL Image</label>
              <input type="text" name="image" />
            </div>
            <div>
              <label htmlFor="stock">Stock</label>
              <input type="text" name="stock" />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input type="text" name="price" />
            </div>
            <div>
              <button type="submit">Create</button>
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

export default CreateNewProduct;
