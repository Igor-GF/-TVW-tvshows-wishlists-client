import React, { useState } from 'react';
import ListsService from '../../services/ListsService';
import { useHistory } from 'react-router-dom';

const initialState = {
  listName: '',
  shows: [],
  owner: '',
}

const AddWishList = () => {

  const [wishListState, setWishListState] = useState(initialState);
  const history = useHistory();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setWishListState({...wishListState, [name]: value})
  }
  
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const service = new ListsService();

    service
      .createList(wishListState)
      .then((response) => {
        setWishListState(initialState);
        history.push('/profile');
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <h2>Create Wishlist</h2>
      <form onSubmit={formSubmissionHandler}>
        <label>Name of the wishlist:</label>
        <input type="text" name="listName" value={wishListState.listName} onChange={inputChangeHandler}/>

        <button className="btn" type="submit">Create</button>
      </form>
    </div>
  )
}

export default AddWishList;