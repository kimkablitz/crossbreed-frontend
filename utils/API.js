import axios from "axios";

const baseURL = "http://localhost:5000/api"

export default {
    updateLevel: (petId, levelObj) => {
        return axios.put(`${baseURL}/pets/level/${petId}`, levelObj);
    }
}