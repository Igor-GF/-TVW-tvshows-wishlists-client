import React, { useState, useEffect } from 'react';
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
    <div>
      <div className="container">
        <section>
          <img src={userState.photoUrl} alt="profile-pic"/>
          <h3>{userState.username}</h3>

          {userState.wishLists && <AllWishlists userData={userState}/>}

          {console.log(userState)}
        </section>
{/* 
        <div>
          <h3>My wishlists</h3><Link to="/create-list">new list</Link>
          <ul>
            <AllWishlists userData={{...userState}}/>
          </ul>          
        </div> */}

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