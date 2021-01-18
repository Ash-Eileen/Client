import axios from 'axios'


export default axios.create({
  baseURL: 'https://north-pole-post-backend.herokuapp.com',
  timeout: 5000,
  withCredentials: true
})