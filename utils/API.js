import axios from "axios";

const baseURL = "https://crossbreed-backend.herokuapp.com"

export default {
    
    login: (userObj) => {
        return axios.post(`${baseURL}/auth/login`, userObj)
    },
    logout: () => {
        return axios.post(`${baseURL}/auth/logout`)
    },
    getUser: () => {
        return axios.get(`${baseURL}/auth/user`)
    },
    // registerUser: (userObj) => {
    //     return axios.post("https://crossbreed-backend.herokuapp.com/auth/signup", userObj)
    // },
    savePet: (petObj, userId) => {
        return axios.post(`${baseURL}/api/pet/` + userId, petObj)
    },
    getUserPets: (userId) => {
        return axios.get(`${baseURL}/api/pet/` + userId)
    },
    saveEgg: (eggObj, userId) => {
        return axios.post(`${baseURL}/api/egg/` + userId, eggObj)
    },
    getUserEggs: (userId) => {
        return axios.get(`${baseURL}/api/egg/` + userId)
        // return axios.post(`${baseURL}/auth/login`, userObj);
    },
    signUp: (userObj) => {
        return axios.post(`${baseURL}/auth/signup`, userObj);
    },
    googleLogin: (googleUserObj) => {
        return axios.post(`${baseURL}/auth/login/google`, googleUserObj);
    }
}