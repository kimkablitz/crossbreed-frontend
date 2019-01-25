import axios from 'axios';

let GOOGLE_TOKEN = null;

const SERVER_URL = 'https://crossbreed-backend.herokuapp.com';

export const setIdToken = token => {
  GOOGLE_TOKEN = token;
};

export const getPetsFromServer = () =>
  axios
    .get(`${SERVER_URL}/api/pets`, {
      headers: {
        Authorization: `Bearer ${GOOGLE_TOKEN}`
      }
    })
    .then(response => handleResponse(response).data);

export const getPetFromServer = ({ petId }) =>
  axios
    .get(`${SERVER_URL}/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${GOOGLE_TOKEN}`
      }
    })
    .then(response => handleResponse(response).data);

export const editPetInfoOnServer = ({ petId, updates }) =>
  axios
    .put(
      `${SERVER_URL}/api/pets/${petId}`,
      { updates },
      {
        headers: {
          Authorization: `Bearer ${GOOGLE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => handleResponse(response).data);

export const postPetToServer = ({ values }) =>
  axios
    .post(`${SERVER_URL}/api/pets/`, values, {
      headers: {
        Authorization: `Bearer ${GOOGLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => handleResponse(response));

export const deletePetFromServer = ({ petId }) =>
  axios
    .delete(`${SERVER_URL}/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${GOOGLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => handleResponse(response).data);


export const getUsersFromServer = () =>
  axios
    .get(`${SERVER_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${GOOLE_TOKEN}`
      }
    })
    .then(response => handleResponse(response).users);

export const getUserWithPetsFromServer = googleId =>
  axios
    .get(`${SERVER_URL}/api/users/${googleId}`, {
      headers: {
        Authorization: `Bearer ${GOOLE_TOKEN}`
      }
    })
    .then(response => handleResponse(response).user);



const handleResponse = response => {
  if (response && response.data) {
    if (!response.data.success) {
      throw response.message ? response.message : 'Error';
    }
    return response.data;
  } else {
    throw new Error('Error');
  }
};
