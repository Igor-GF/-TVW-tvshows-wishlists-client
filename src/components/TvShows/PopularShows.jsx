import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const PopularShows = () => {

  const [popularShows, setPopularShows] = useState([]);
  const [pageState, setPageState] = useState(1);

  useEffect(() => {
    axios
      .get(`https://www.episodate.com/api/most-popular?page=${pageState}`)
      .then((response) => {
        setPopularShows(response.data.tv_shows);
      })
      .catch((err) => console.log(err));
  }, [pageState]);

  const setPageBackHandler = () => setPageState(pageState - 1);
  const setPagenNextHandler = () => setPageState(pageState + 1);

  return (
    <div className="container-fluid">

      <div className="sub-title-container">
        <h4>MOST POPULAR SHOWS</h4>
        <div className="nav-btn-container">
          {pageState > 1 && <button className="btn" onClick={setPageBackHandler}>BACK</button>}
          <span>  {pageState}  </span>
          {pageState < 927 && <button className="btn" onClick={setPagenNextHandler}>NEXT</button>}
        </div>        
      </div>
      
      <div className="row most-popular-container">
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
