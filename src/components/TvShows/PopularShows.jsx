import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const PopularShows = () => {

  const [popularShows, setPopularShows] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/most-popular?page=1")
      .then((response) => {
        setPopularShows(response.data.tv_shows);
      })
      .catch((err) => console.log(err));
  }, [popularShows]);

  return (
    <div className="container-fluid">
      <h3>Component Most popular shows</h3>
      <div className="row">
        {
          popularShows &&
          popularShows.map((showItem) => {
            return(
              <div className="tvshow-card col-3" key={showItem.id}>
                  <img src={showItem.image_thumbnail_path} alt='tv-show-poster'/>
                  <div>
                    <h6>{showItem.name}</h6>
                  </div>
                  <div className="movie-details-link">
                    <Link to={`/show-details/${showItem.id}`}><button className="btn">see details</button></Link>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PopularShows;
