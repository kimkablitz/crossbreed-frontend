import axios from "axios";

const baseURL = "http://localhost:3001/"

export default {
    testRoute: () => {
        return axios.get(baseURL);
    },
    login: (userObj) => {
        return axios.post("https://uw-playground-api.herokuapp.com/auth/login", userObj);
    },
    signUp: (userObj) => {
        return axios.post("https://uw-playground-api.herokuapp.com/auth/signup", userObj)
    }
}