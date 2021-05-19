import React, { useState, useEffect } from 'react';
import ListsServices from '../services/ListsService';
import { Link } from 'react-router-dom'

const Wishlist = ({ match }) => {

  const [wishListState, setWishListState] = useState(null);
  const { listId } = match.params;

  const service = new ListsServices();

  const toGetWishList = () => {

    service
     .getWishList(listId)
     .then((resWishlist) => {

        console.log(resWishlist);
        setWishListState(resWishlist);
     })
     .catch(err => console.error(err))
  
  }

  useEffect(toGetWishList, [listId]);

  return (
    <div>
      <div>
        <h2>{wishListState.listName} - Wishlist</h2>
        {
          wishListState.shows.map((showItem) => {
            return(
              <div className="tvshow-card col-3" key={showItem.id}>
                  <img src={showItem.image_thumbnail_path} alt='tv-show-poster'/>
                  <div>
                    <h6>{showItem.name}</h6>
                  </div>
                  <div className="movie-details-link">
                    <Link to={`/show-details/${showItem.id}`}><h5>see details</h5></Link>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Wishlist;