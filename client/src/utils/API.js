import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Updates a user field in the database
  updateFieldUser: function(id, updateField) {
    return axios.put("/api/users/" + id, updateField);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

 // Gets all sessions
 getSessions: function() {
  return axios.get("/api/sessions");
},
// Gets the session with the given id
getSession: function(id) {
  return axios.get("/api/sessions/" + id);
},
// Deletes the session with the given id
deleteSession: function(id) {
  return axios.delete("/api/sessions/" + id);
},
// Updates a session field in the database
updateFieldSession: function(id, updateField) {
  return axios.put("/api/sessions/" + id, updateField);
},
// Saves a session to the database
saveSession: function(sessionData) {
  return axios.post("/api/sessions", sessionData);
},

// Gets all beaches
getBeaches: function() {
  return axios.get("/api/beaches");
},
// Gets the beach with the given id
getBeach: function(id) {
  return axios.get("/api/beaches/" + id);
},
// Deletes the beach with the given id
deleteBeach: function(id) {
  return axios.delete("/api/beaches/" + id);
},
// Updates a beach field in the database
updateFieldBeach: function(id, updateField) {
  return axios.put("/api/beaches/" + id, updateField);
},
// Saves a beach to the database
saveBeach: function(beachData) {
  return axios.post("/api/beaches", beachData);
},

getListOfBeaches: function(){
  return axios.get("http://api.spitcast.com/api/spot/all")
}
// Placeholders for the APIs

// getSurfReport: function() {
//   return axios.get("https://dog.ceo/api/breeds/image/random");
// },

// getWebCam: function() {
//   return axios.get("https://dog.ceo/api/breed/" + breed + "/images");
// },

// getRentals: function() {
//   return axios.get("https://dog.ceo/api/breeds/image/random");
// },

// getResturants: function() {
//   return axios.get("https://dog.ceo/api/breeds/image/random");
// },

};
