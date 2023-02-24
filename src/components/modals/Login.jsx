import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginContext from '../../context/LoginContext';
const URL_LOGIN = `https://litethinkingbackend.herokuapp.com/auth`;

const Login = () => {
  const [show, setShow] = useState(false);
  let [token, setToken] = useContext(LoginContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = async (obj_data) => {
    let data2 = await fetch(URL_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj_data)
    });
    // convert the data to json
    const json = await data2.json();
    localStorage.setItem("token", json.token);
    localStorage.setItem("name", json.user.name);
    localStorage.setItem("lastname", json.user.lastname);
    localStorage.setItem("photo", json.user.photo);
    localStorage.setItem("phone", json.user.phone);
    localStorage.setItem("username", json.user.username);
    console.log(json);
    setToken(json.token)
  }

  const onSubmit =async  (e) => {
    e.preventDefault();
    await login({
      username: e.target[0].value,
      password: e.target[1].value
     });
     handleClose();
  };

  return (
    <>
      <span onClick={handleShow}>Login</span>
      {/* <Button className='new-article' onClick={handleShow}>
        +
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="createProductFrom" className='company-form' onSubmit={onSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" name="password" />
            </div>
            <div>
              <button type="submit">Login</button>
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

export default Login;
