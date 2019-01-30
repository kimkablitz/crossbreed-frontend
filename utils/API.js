import axios from "axios";

const baseURL = "http://10.19.182.12:3001" //"https://crossbreed-backend.herokuapp.com"

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
    getPet: (petId) => {
        return axios.get(`${baseURL}/api/pets/` + petId)
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
    breedPets: (parentsObj) => {
        return axios.post(`${baseURL}/api/eggs/`, parentsObj)
    },
    saveEgg: (eggObj, userId) => {
        return axios.post(`${baseURL}/api/eggs/` + userId, eggObj)
    },
    getEgg: (eggId) => {
        return axios.get(`${baseURL}/api/eggs/` + eggId)
    },
    getUserEggs: (userId) => {
        return axios.get(`${baseURL}/api/eggs/` + userId)
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