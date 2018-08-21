import React, { Component } from "react"
import API from "../../utils/API"



class FindInstructorPage extends Component {
    state= {
        beaches: []
    }
    // have a function that goes to the api that give us nearest beaches
    //spitcast API Endpoint api/spot/nearby?longitude=...?latitude=...

   componentDidMount() {
       this.getBeaches();
   }
        
    getBeaches = () => {
        API.getListOfBeaches()
        .then(res=> {
            this.setState({beaches: res.data})})
        .catch(err=>console.log(err))
        
        console.log(this.state.beaches)
        return<div>here</div>
        
       //  return <div>{this.state.beaches.map(spot=>{
       //     <select>{spot.spot_name}</select>
       // })}</div>
    }
    
    
   






render(){
    console.log(this.state.beaches)
    return <div className="container">
        <label name="Beach">Choose a Beach</label>
        <select>
            {this.state.beaches.map(beach=>(
                <option>{beach.spot_name}</option>
            ))}
        </select>
    </div>
}
}
export default FindInstructorPage