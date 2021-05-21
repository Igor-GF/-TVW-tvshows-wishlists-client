import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const PopularShows = () => {

  const [showsState, setShowsState] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(`https://www.episodate.com/api/most-popular?page=${pageState}`)
      .then((response) => {
        setShowsState(response.data.tv_shows);
      })
      .catch((err) => console.log(err));
  }, [pageState]);

  const setPageBackHandler = () => setPageState(pageState - 1);
  const setPagenNextHandler = () => setPageState(pageState + 1);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .get(`https://www.episodate.com/api/search?q=${searchTerm}&page=1`)
      .then((response) => {
        setShowsState(response.data.tv_shows);
      })
      .catch((err) => console.log(err));

    setSearchTerm('');
  };

  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <section className="row">
        <div className="searchbar-container">
          <form onSubmit={onSubmitHandler}>
            <input className="searchbar" 
              type="search" 
              value={searchTerm}
              placeholder="search..."
              onChange={onChangeHandler}
            />
          </form>
        </div>

        <div className="sub-title-container">
          <h4>MOST POPULAR SHOWS</h4>
          <div className="nav-btn-container">
            {pageState > 1 && <button className="btn" onClick={setPageBackHandler}>BACK</button>}
            <span>  {pageState}  </span>
            {pageState < 927 && <button className="btn" onClick={setPagenNextHandler}>NEXT</button>}
          </div>        
        </div>
      </section>

      <section>
        <div className="row most-popular-container">
          {
            showsState &&
            showsState.map((showItem) => {
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
      </section>
    </div>
  )
}

export default PopularShows;
