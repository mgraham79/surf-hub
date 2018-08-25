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
  //Gets instructors at given beach who are available
  getUsersAtBeach: function(beach){
    return axios.get("api/users/available/"+beach)
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
//Gets a session based on Instructor ID
getOpenSessionByInstructorID: function(id){
  return axios.get("/api/sessions/open/"+id)
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
updateFieldBeach: function(id, data) {
  return axios.put("/api/beaches/" + id, data);
},
// Saves a beach to the database
saveBeach: function(beachData) {
  return axios.post("/api/beaches", beachData);
},

getListOfBeaches: function(){
  return axios.get("/api/proxy/beaches");
},

getForecast: function(spot_id){
  return axios.get("/api/proxy/forecast/" + spot_id);
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
// updateFieldBeach("5b7aef7d01ca7ef0dc408175", {beachName: "React Beach"});