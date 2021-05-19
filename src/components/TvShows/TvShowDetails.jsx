import React, { useState, useEffect } from 'react';
import ListsService from '../../services/ListsService';
import axios from 'axios';

const TvShowDetails = ({ match }) => {

  const [showDetails, setShowDetails] = useState({});
  // const [msgState, setMsgState] = useState(null);
  const service = new ListsService();

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
  }

  const addShowToWatchedtHandler = () => {
    service
      .addToWatchedlist(showDetails)
      .then()
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <div className="container-fluid">
        <figure>
          <img src={showDetails.image_thumbnail_path} alt='cover'/>
        </figure>
        <article>
          <h1>{showDetails.name}</h1>      
          <p>Description: {showDetails.description}</p>
          <p>Network: {showDetails.network}</p>
          <p>Start date: {showDetails.start_date}</p>
          <p>Status: {showDetails.status}</p>
        </article>
        <div>
          <button className="btn" onClick={addShowToWishlistHandler}>wishlist</button>
          <button className="btn" onClick={addShowToWatchedtHandler}>watched</button>
        </div>
      </div>
    </div>
  )
}

export default TvShowDetails;
