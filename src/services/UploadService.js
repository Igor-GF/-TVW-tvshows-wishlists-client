import axios from 'axios';
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class UploadService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  upload = (theFile) => {
    return this.service
    .post("/upload", theFile)
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
  };
}

export default UploadService;