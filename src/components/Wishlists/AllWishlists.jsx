import React from 'react';
import { Link } from "react-router-dom";

const AllWishlists = ({userData}) => {

  return (
    <div>
      <div className="wishlists-container">
        <p>Wishlists</p>
        <Link to="create-list">
          <button className="btn">Create</button>
        </Link>
        
      </div>
      <ul>
        { 
          userData.wishLists.map((listItem) => {
            return(
              <li key={listItem._id}>
                <Link to={`/wishlists/${listItem._id}`}><p>{listItem.listName}</p></Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default AllWishlists;