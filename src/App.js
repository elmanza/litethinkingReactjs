import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import CreateNewProduct from './components/modals/CreateNewProduct';
import Login from './components/modals/Login';
import Logout from './components/Logout';
import LoginContext from "./context/LoginContext";
import CreateNewCompany from "./components/modals/CreateNewCompany";

function App() {
  let [token, setToken] = useState(null);
  let [companies, setCompanies] = useState([]);
  let [products, setProducts] = useState([]);
  let [company, setCompany] = useState(null);
  // let getToken = localStorage.getItem("token");
  useEffect(()=>{
    getCompanies();
    setToken(localStorage.getItem("token"));
  }, []);

  let getCompanies = async () =>{
    fetch('https://litethinkingbackend.herokuapp.com/company')
    .then(response => response.json())
    .then(data => setCompanies(data));
  }

  let getCompany = async id =>{
    fetch(`https://litethinkingbackend.herokuapp.com/company/${id}`)
    .then(response => response.json())
    .then(data => setCompany(data));
  }

  let getArticles = async id =>{
    fetch(`https://litethinkingbackend.herokuapp.com/article/${id}`)
    .then(response => response.json())
    .then(data => setProducts(data));
  }

  let updateCompanyRequest = async (obj_data) =>{
    fetch(`https://litethinkingbackend.herokuapp.com/company/${company.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj_data)
    })
    .then(response => response.json())
    .then(() => {getCompany(company.id);getCompanies()});
  }

  let getCompanyInfo = async id => {
    await getCompany(id);
    await getArticles(id);
  }

  let updateCompany = (e) =>{
    e.preventDefault();
    updateCompanyRequest({
      nombre: e.target[0].value,
      direccion: e.target[1].value,
      nit: e.target[2].value,
      telefono: e.target[3].value
     });
  }
  return (
    <LoginContext.Provider value={[token, setToken]}>
      <div className='body-page'>
        <div className="App">
          <header className="App-header">
            <ul className='header-menu'>
              <li>
                  {
                    token ? <Logout /> : <Login />
                  }
              </li>
            </ul>
          </header>
          <div className='App-body'>
            <div className='App-leftside'>
              <div>
                <h6>Companies</h6>
                  { token && <CreateNewCompany /> }
              </div>
              <ul className='list-companies'>
                {
                  companies.map(company => (
                    <li onClick={()=>{getCompanyInfo(company.id)}} key={company.id}>
                      <img src={logo} alt="logo" />
                      <div>
                        <span>{company.nombre}</span>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='App-rightside'>
              {
                company && (
                  <>
                    <div className='company-info'>
                      <img src={logo} className="" alt="logo" />
                      <div>
                        <form className='company-form' onSubmit={updateCompany}>
                          <div>
                            <label htmlFor="nombre">Name</label>
                            <input type="text" name="nombre" defaultValue={company ? company.nombre : ''} />
                          </div>
                          <div>
                            <label htmlFor="direccion">Address</label>
                            <input type="text" name="direccion"  defaultValue={company ? company.direccion : ''} />
                          </div>
                          <div>
                            <label htmlFor="nit">NIT</label>
                            <input type="text" name="nit"  defaultValue={company ? company.nit : ''} />
                          </div>
                          <div>
                            <label htmlFor="telefono">Phone</label>
                            <input type="text" name="telefono"  defaultValue={company ? company.telefono : ''} />
                          </div>
                          { token && ( <div> <button type="submit">Update</button> </div> )}                    
                        </form>
                      </div>
                    </div>
                    <div className="aticles">
                      <div className='aticles-header'>
                        <h6>Products</h6>
                        <div>
                          <span className='counter-articles'>{products.length}</span>
                          {
                            token && <CreateNewProduct companyid={company && company.id}/>
                          }
                          
                        </div>
                      </div>
                      <ul className='aticles-list'>
                        {
                          products.map(product =>(
                            <li key={product.id}>
                              <img src={logo} className="" alt="logo" />
                              <div>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <span>Price: ${product.price}</span>
                                <span>Stock: {product.stock}</span>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </>
                )
              }
             
            </div>
          </div>
        </div>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
