import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

import UserList from './components/UserList'
import NewUser from './components/NewUser'


function App() {
  const [users, setUsers] = useState([])

  const getData = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res)
        setUsers(res.data)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <NewUser getdata={getData} />

      <UserList users={users} getdata={getData} />
    </div>
  );
}

export default App;
