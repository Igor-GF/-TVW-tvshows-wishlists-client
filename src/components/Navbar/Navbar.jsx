import { Link, useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Searchbar from '../SearchBar/Searchbar';

const Navbar = ({ userState }) => {

  const history = useHistory();
  const service = new AuthService();

  const logoutHandler = () => {
    service
     .logout()
     .then((response) => {
        console.log(response.message);
     })
     history.push('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/">
        <img src="https://res.cloudinary.com/drgrtgd5l/image/upload/v1621374872/server-tv-shows/TVW-logo-h60_vyg1e5.png" alt="logo-pic" />
      </Link>
      <Searchbar />
      {
        userState 
          ? ( <div>
              <Link className="btn" to="/profile">My shows</Link>
              <button className="btn" onClick={logoutHandler}>logout</button>
            </div>
          ):( <div>
              <Link className="btn" to="/signup">sign up</Link>
              <Link className="btn" to="/login">login</Link>
            </div>  
          )
      }       
    </nav>
  )
}

export default Navbar;