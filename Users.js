import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https:acme-users-api-rev.herokuapp.com/api';

const fetchUsers = (idx)=> {
  const UsersAPI = `${API}/users${ idx || ''}`
  console.log("UsersAPI = ", UsersAPI);
  return axios.get( UsersAPI )
    .then( response => response.data);
};

const Pager = ({ count, idx })=> {
  const _idx = idx;
  const pages = new Array(Math.round(count/50)).fill('').map( (_, idx)=> {
    return {
      text: idx + 1,
      idx,
      selected: (!_idx && idx === 0) || _idx*1 === idx
    };
  });
  return (
    <nav className='pager'>
      {
        pages.map( page => {
          return (
          <a key={ page.idx } href={`#view=users&idx=${page.idx}`} className={ page.selected ? 'selected': ''}>
            { page.text }
          </a>
          );
        })
      }
    </nav>
  );
};

/* This code is for documentation purposes.
The following object is the structure of the User API data:
const usersObj = {
  fullName: "",
  id: "",
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  title: "",
  avatar: "",
  createdAt: "",
  updatedAt: "",
  companyId: ""
}
*/

const Users = ({ idx })=> {
  const [users, setUsers] = useState([]);
  const [ count, setCount] = useState(0);

  useEffect(()=> {
    fetchUsers(idx)
      .then( response => {
        setUsers(response.users);
        setCount(response.count);
      });
  }, [idx]);

  return (
    <div>
      <Pager count={ count } idx={ idx }/>
      <h2>Users ({ users.length})</h2>
      <ul>
        {
          users.map( user => {
            return (
            <li key={ user.id }>
            {user.fullName}</li>
            );
          })
        }
      </ul>
    </div>
  );
}; //end of unnamed function

export default Users;
