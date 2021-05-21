import React, { Component } from 'react';
import AuthService from "../../services/AuthService";
import UploadService from '../../services/UploadService';
import { Link } from 'react-router-dom';

class ProfileEdit extends Component {

  state = { username: '', photoUrl: '' }

  formSubmitHandler = (event) => {
    event.preventDefault();

    const { username, photoUrl } = this.state;

    const service = new AuthService();
    
    service
      .profileEdit({ username, photoUrl })
      .then()
      .catch((error) => console.error(error));
  }

  uploadFileHandler = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    const service = new UploadService();

    service
      .upload(uploadData)
      .then((response) => {
        
        this.setState({ ...this.state, photoUrl: response.cloudinaryUrl });
      })
      .catch((err) => console.error(err));
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmitHandler}>

          <div className="mb-3">
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={(e) => this.onChangeHandler(e)}/>
          </div>
            
          <div className="mb-3">
            <label>Upload a profile picture </label>
            <input type="file" name="imageUrl" onChange={(e)=>this.uploadFileHandler(e)}/>
          </div>          

          <button className="btn" type="submit">SAVE</button>
        </form>

          <Link to="/profile"><button className="btn" type="submit">BACK</button></Link>
      </div>
    )
  }
}

export default ProfileEdit;
