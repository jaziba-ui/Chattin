import axios from 'axios';

const API_ROOT = process.env.REACT_APP_SERVER_URI

axios.defaults.baseURL = API_ROOT;

export const fetchUsers = () => {
    return axios.get(`/users`)
      .then(res => {
        console.log("fetchUsers response:", res); // Add this line
        return res.data.data;
      });
  };
  