import React, { Component } from 'react';
import AuthService from "../../services/AuthService";
import UploadService from '../../services/UploadService';
import { Link } from 'react-router-dom';

class Signup extends Component {

  state = { username: '', email: '', password: '', photoUrl: '' }

  formSubmitHandler = (event) => {
    event.preventDefault();

    const { username, email, password, photoUrl } = this.state;

    const service = new AuthService();
    
    service
      .signup({ username, email, password, photoUrl })
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
            {/* <label for="username">Username </label> */}
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={(e) => this.onChangeHandler(e)}/>
          </div>

          <div className="mb-3">
            {/* <label>Email </label> */}
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e)=>this.onChangeHandler(e)}/>
          </div>
            
          <div className="mb-3">
            {/* <label>Password </label> */}
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e)=>this.onChangeHandler(e)}/>
          </div>
            
          <div className="mb-3">
            <label>Upload a profile picture </label>
            <input type="file" name="imageUrl" onChange={(e)=>this.uploadFileHandler(e)}/>
          </div>          

          <button className="btn" type="submit">SIGNUP</button>
        </form>

        <p>Do you already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    )
  }
}

export default Signup;