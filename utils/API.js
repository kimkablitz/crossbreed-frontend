// import axios from "axios";

// const baseURL = "http://localhost:3001/"

// export default {
//     testRoute: () => {
//         return axios.get(baseURL);
//     },
//     login: (userObj) => {
//         return axios.post("https://uw-playground-api.herokuapp.com/auth/login", userObj);
//     },
//     signUp: (userObj) => {
//         return axios.post("https://uw-playground-api.herokuapp.com/auth/signup", userObj)
//     }
// }
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
    saveBook: (bookObj, userId) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/book/" + userId, bookObj)
    },
    getUserBooks: (userId) => {
        return axios.get("https://crossbreed-backend.herokuapp.com/api/book/" + userId)
    }
}