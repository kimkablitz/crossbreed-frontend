import axios from "axios";

const baseURL = "https://crossbreed-backend.herokuapp.com"

export default {
    
    login: (userObj) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/auth/login", userObj)
    },
    logout: () => {
        return axios.post("https://crossbreed-backend.herokuapp.com/auth/logout")
    },
    getUser: () => {
        return axios.get("https://crossbreed-backend.herokuapp.com/auth/user")
    },
    // registerUser: (userObj) => {
    //     return axios.post("https://crossbreed-backend.herokuapp.com/auth/signup", userObj)
    // },
    savePet: (petObj, userId) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/pet/" + userId, petObj)
    },
    getUserPets: (userId) => {
        return axios.get("https://crossbreed-backend.herokuapp.com/api/pet/" + userId)
    },
    breedPets: (parentsObj) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/eggs/", parentsObj)
    },
    saveEgg: (eggObj, userId) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/eggs/" + userId, eggObj)
    },
    getUserEggs: (userId) => {
        return axios.get("https://crossbreed-backend.herokuapp.com/api/eggs/" + userId)
        // return axios.post(`${baseURL}/auth/login`, userObj);
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