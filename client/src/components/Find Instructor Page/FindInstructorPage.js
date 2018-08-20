import React, { Component } from "react"
const axios = require("axios")



class FindInstructorPage extends Component {

    // have a function that goes to the api that give us nearest beaches
    //spitcast API Endpoint api/spot/nearby?longitude=...?latitude=...

    getBeaches = (beaches) => {
        return <div>{beaches.map(spot=>{
            <select>{spot.spot_name}</select>
        })}</div>
    }






render(props){
    return <div className="container">
        <label name="Beach">Choose a Beach</label>
        <option><this.getBeaches/></option>
    </div>
}
}
export default FindInstructorPage