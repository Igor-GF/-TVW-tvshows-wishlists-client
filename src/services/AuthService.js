import axios from 'axios';
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  signup = (userData) =>
    this.service.post("/signup", userData).then((response) => response.data);

  login = (userData) =>
    this.service.post("/login", userData).then((response) => response.data);

  logout = () =>
    this.service.post("/logout").then((response) => response.data);

  profile = () =>
    this.service.get("/profile").then((response) => response.data);

  profileEdit = () =>
    this.service.put("/profile/edit").then((response) => response.data);

  profileDelete = () =>
    this.service.delete("/profile/delete").then((response) => response.data);

  loggedin = () =>
  this.service
    .get("/loggedin").then((response) => response.data);
}

export default AuthService;