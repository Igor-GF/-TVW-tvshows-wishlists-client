import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({});
  const history = useHistory();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const { email, password } = loginInfo;
    const service = new AuthService();

    service
      .login({ email, password })
      .then((response) => {
        history.push('/profile');
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>

        <div className="mb-3">
          <input type="email" name="email" placeholder="Email" value={loginInfo.email} onChange={onChangeHandler}/>
        </div>
          
        <div className="mb-3">
          <input type="password" name="password" placeholder="Password" value={loginInfo.password} onChange={onChangeHandler}/>
        </div>        

        <button className="btn" type="submit">LOGIN</button>
      </form>

      <p>Don't you have an account?
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login;