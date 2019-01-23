import axios from "axios";

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
    registerUser: (userObj) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/auth/signup", userObj)
    },
    savePet: (petObj, userId) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/pet/" + userId, petObj)
    },
    getUserPets: (userId) => {
        return axios.get("https://crossbreed-backend.herokuapp.com/api/pet/" + userId)
    },
    saveEgg: (eggObj, userId) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/egg/" + userId, eggObj)
    },
    getUserEggs: (userId) => {
        return axios.get("https://crossbreed-backend.herokuapp.com/api/egg/" + userId)
    }
}