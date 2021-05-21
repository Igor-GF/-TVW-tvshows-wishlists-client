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

  return userState && (
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

        <div className="movie-right-container">
          <h2>{userState.username}</h2>
          <div className="user-lists-container">
            <article>
              {userState.wishLists && <AllWishlists userData={userState}/>}
            </article>

            { userState.watchedShows && (
            <article>
              <div className="list-container">
                <div className="list-head-container">
                     <h6>{userState.watchedShows.length} Watched Shows</h6>
                </div>
                <div>
                  <ul>
                    { 
                      userState.watchedShows.map((showItem) => {
                        return(
                          <li key={showItem._id}>
                            <Link to={`/show-details/${showItem._id}`}><p>{showItem.name}</p></Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </article>
            )}
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Profile;