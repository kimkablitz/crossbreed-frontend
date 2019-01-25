// import axios from "axios";

// const baseURL = "http://localhost:3001/"

const baseURL = "https://crossbreed-backend.herokuapp.com"

export default {
    
    login: (userObj) => {
        return axios.post(`${baseURL}/auth/login`, userObj);
    },
    signUp: (userObj) => {
        return axios.post(`${baseURL}/auth/signup`, userObj);
    },
    googleLogin: (googleUserObj) => {
        return axios.post(`${baseURL}/auth/login/google`, googleUserObj);
    }
}