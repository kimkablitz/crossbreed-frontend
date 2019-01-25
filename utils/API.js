import axios from "axios";

const baseURL = "https://crossbreed-backend.herokuapp.com"

export default {
    testRoute: () => {
        return axios.get(baseURL);
    },
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