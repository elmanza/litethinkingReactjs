import {useContext} from 'react';
import LoginContext from '../context/LoginContext';

const Logout = () => {
  let [token, setToken] = useContext(LoginContext);
  let logout = () =>{
    localStorage.clear();
    setToken(null);
    window.location.reload();
  }
  return (
    <span onClick={logout}>Logout</span>
  )
}

export default Logout
