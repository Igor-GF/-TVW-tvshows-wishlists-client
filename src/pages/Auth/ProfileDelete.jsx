import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const ProfileDelete = () => {

  const history = useHistory();

  const deleteProfileHandler = () => {
    const service = new AuthService();

    service 
      .profileDelete()
      .then((response) => {
        history.push("/");
      })
      .catch((err) => console.error(err))
    }

    const noRedirectionHandler = () => {
      history.push("/profile");
    }

  return (
    <div className="container-fluid">
      <div className="alert-main-container">
      <p>
      Are you sure you want to completely delete your profile?
      </p>
        <div className="alert-btn-container">
          <button className="btn" onClick={deleteProfileHandler}>Yes</button>            
          <button className="btn" onClick={noRedirectionHandler}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDelete;


