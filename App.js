import React, { useState, useEffect } from 'react';
import qs from 'qs';
import './App.css';
import Users from './Users.js';

const Nav = ({ view })=> {
  return (
    <nav>
      <a href='#home' className={ !view ? 'selected': ''}>Home</a>
      <a href='#view=users' className={ view === 'users' ? 'selected': ''}>Users</a>
    </nav>
  );
};

const Home = ()=><div>Home</div>;

function App() {
  const getHash = ()=> {
    return window.location.hash.slice(1);
  }
  const [ params, setParams ] = useState(qs.parse(getHash()));

  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(getHash()));
    });
  }, []);

  const { view } = params;

  return (
    <div>
      <Nav view={ view }/>
      <main>
        {
          !view && <Home />
        }
        {
          view === 'users' && <Users />
        }
      </main>
    </div>
  );
}

export default App;
