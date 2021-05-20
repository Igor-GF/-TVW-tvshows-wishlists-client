import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListsService from '../../services/ListsService';
import axios from 'axios';

const TvShowDetails = ({ match }) => {

  const [showDetails, setShowDetails] = useState({});
  // const [msgState, setMsgState] = useState(null);
  const service = new ListsService();
  const history = useHistory();

  const apiCall = () => {
    const { showId } = match.params;
    
    axios
      .get(`https://www.episodate.com/api/show-details?q=${showId}`)
      .then((showInfo) => {
        setShowDetails(showInfo.data.tvShow);
      })
      .catch((err) => console.log(err));
  }

  useEffect((apiCall), [match.params]);

  const addShowToWishlistHandler = () => {
    service
      .addToWishlist(showDetails)
      .then()
      .catch((error) => console.error(error));

      history.push('/wishlists/:listId');
  }

  const addShowToWatchedtHandler = () => {
    service
      .addToWatchedlist(showDetails)
      .then()
      .catch((error) => console.error(error));
    
      history.push('/profile');
  }

  const goBackHandler = () => {
    history.go(-1);
  }

  return (
    <div className="container-fluid">
      <div className="movie-main-container">
        <div className="movie-left-container">
          <figure>
            <img src={showDetails.image_thumbnail_path} alt='cover'/>
          </figure>

          <div className="movie-left-btn-container">
            <button className="btn" onClick={addShowToWishlistHandler}>wishlist</button>
            <button className="btn" onClick={addShowToWatchedtHandler}>watched</button>
          </div>
          <div className='movie-bottom-info'>
            <p>Network: {showDetails.network}</p>
            <p>Start date: {showDetails.start_date}</p>
            <p>Status: {showDetails.status}</p>
          </div>
        </div>
        
        <article className="movie-right-container">
          <h2>{showDetails.name}</h2>      
          <p>Description: {showDetails.description}</p>
        </article>        
      </div>
      <div className="nav-btn-container">
        <button className="btn" onClick={goBackHandler}>BACK</button>
      </div>
    </div>
  )
}

export default TvShowDetails;
