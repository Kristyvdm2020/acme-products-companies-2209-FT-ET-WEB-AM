import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

const Products = (props) => {
  const {products} = props;
  return (
    <ul>
        {
          products.map(product => {
            return (
              <li key={product.id}>
              {product.name}
              </li>
            );
          })
        }
      </ul>
  )
}

const Companies = (props) => {
  const {companies} = props;
 return (
  <ul>
        {
          companies.map(company => {
            return (
              <li key={company.id}>
              {company.name}
              </li>
            );
          })
        }
      </ul>
 )
}

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [view, setView] = useState('');

  useEffect (()=> {
    window.addEventListener('hashchange', ()=> {
      setView(window.location.hash.slice(1));
    })
    setView(window.location.hash.slice(1));
  })
  useEffect (()=> {
    fetch('https://www.acme-api.com/api/products')
    .then( response => {
      return response.json();
    })
    .then ( json => setProducts(json))

    fetch('https://www.acme-api.com/api/companies')
    .then( response => {
      return response.json();
    })
    .then ( json => setCompanies(json))
  }, []);

  return (
    <div>
      <h1>Acme Products Companies</h1>
      <nav>
        <a href='#products'>Products ({products.length})</a>
        <a href='#companies'>Companies ({companies.length})</a>
      </nav>
      {view === 'products' ? <Products products={products} />: null}
      {view === 'companies' ? <Companies companies={companies}/>: null}
    </div>
  );
};
//const root = ReactDOM.createRoot(document.querySelector('#root'));
//root.render(<App />);
ReactDOM.render(<App />, document.querySelector('#root'));