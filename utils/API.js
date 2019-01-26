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
    },
    updateUsername: (userId, newUsername) => {
        return axios.put(`${baseURL}/api/users/${userId}`, newUsername);
    },
    updateLevelAndXP: (petId, levelObj) => {
        return axios.put(`${baseURL}/api/pets/${petId}`, levelObj);
    }
}