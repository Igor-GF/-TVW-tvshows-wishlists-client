import React from 'react';
import { Link } from "react-router-dom";

const AllWishlists = ({userData}) => {

  return (
    <div>
      <div className="list-container">
        <div className="list-head-container">
          <h6>{userData.wishLists.length} Wishlists</h6>
          <Link to="create-list">
            <button className="btn">add</button>
          </Link>
        </div>
        <div>
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
      </div>
    </div>
  )
}

export default AllWishlists;