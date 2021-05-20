import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AllWishlists from '../components/Wishlists/AllWishlists';
import AuthService from '../services/AuthService';

const Profile = () => {

  const [userState, setUserState] = useState({});

  const apiCallUser = () => {
    
    const service = new AuthService();

    service
      .profile()
      .then((loggedUser) => {
        setUserState(loggedUser);
      })
      .catch((err) => console.log(err));
  }

  useEffect((apiCallUser), []);

  return (
    <div className="container-fluid">
      <div className="movie-main-container">
        <div className="movie-left-container">
          <figure>
            <img src={userState.photoUrl} alt="profile-pic"/>
          </figure>

          <div className="movie-left-btn-container">
            <Link to="/profile/edit">
              <button className="btn">edit</button>
            </Link>
            <Link to="/profile/delete">
              <button className="btn">delete</button>
            </Link>
          </div>
        </div>

        <article className="movie-right-container">
          <h2>{userState.username}</h2>
          {userState.wishLists && <AllWishlists userData={userState}/>}
        </article>

        {/* <div>
          <h3>{userState.watchedShows.length} Watched shows</h3>
          <div>
            <ul>
              { userState.watchedShows && (
                  userState.watchedShows.map((itemShow) => {
                    return (
                      <Link to={`/show-details/${itemShow._id}`}>
                        <li key={itemShow._id}>
                          {itemShow.name}
                        </li>
                      </Link>
                    )
                  })
                )
              }              
            </ul>
          </div>
        </div> */}
      </div> 
    </div>
  )
}

export default Profile;