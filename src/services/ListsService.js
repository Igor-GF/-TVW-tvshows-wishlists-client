import axios from 'axios';
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class ListsService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  createList = (listData) =>
    this.service.post("/create-list", listData).then((response) => response.data);

  getWishList = (listData) =>
    this.service.get(`/wishlists/${listData}`).then((response) => response.data);

  addToWatchedlist = (showData) =>
    this.service.post(`/${showData.name}/add-to-watchedList`, showData).then((response) => response.data);

  addToWishlist = (showData) =>
    this.service.post(`/${showData.name}/add-to-wishlists`, showData).then((response) => response.data);
}

export default ListsService;