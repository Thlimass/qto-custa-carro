import axios from 'axios';

const api = axios.create({baseURL: 'https://volanty-price-api.herokuapp.com'});

export default api;

