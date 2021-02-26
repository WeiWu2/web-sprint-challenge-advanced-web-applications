import React, {useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'

const Login = () => {
  
  const {push} = useHistory();
  // form state
  const [credentials, setCredentials] = useState({
    username:'',
    password:'',
    error:''
  })
  const handleChange = (e) => {
    // updates form state
    setCredentials({
      ...credentials,
    [e.target.name]:e.target.value,
    error:''
  })

  }
  const handleLogin = (e) => {
    e.preventDefault();
    // checks if username or password is empty, sets error if they are
    if(credentials.username === '' || credentials.password === '')
      return setCredentials({...credentials, error: 'Username or Password not valid.'})

    else 
    // post request with username and password, sets token to localStorage if successful, sets error otherwise
      {
        axios.post('http://localhost:5000/api/login', credentials)
        .then((res) => {
          localStorage.setItem('token', res.data.payload)
          push('/bubble')

        })
        .catch((err) => {
          setCredentials({...credentials, error:err.response.data.error})
        })
      }
  }
  return (
    <>
      <h1>
        Welcome to the Bubble App!
      </h1>
      <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input value={credentials.username} type='text' name='username' onChange={handleChange}></input>
          </div>
          <div>
          <label>Password</label>
          <input value={credentials.password} type='password' name='password' onChange={handleChange}></input>
          </div>
          <p>{credentials.error}</p> 
          <button>Login</button>
      </form>
      </div>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.