import React, { Component } from "react"
import API from "../../utils/API"
import Beaches from "../../beaches/beachesJson"
import "./goAvailable.css"


class goAvailable extends Component {
    state= {
        beaches: [],
        location: 0
    }
    // have a function that goes to the api that give us nearest beaches
    //spitcast API Endpoint api/spot/nearby?longitude=...?latitude=...

   componentWillMount() {
        this.getBeaches()
        console.log(this.state.beaches)
    }

  
    handleButtonCLick= ()=>{
        API.updateFieldUser(localStorage.getItem("user"), 
        {"location": this.state.location},
        {"available": true}
        )
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    handleButtonCLickNotAvailable= ()=>{
        API.updateFieldUser(localStorage.getItem("user"), 
        {"location": this.state.location},
        {"available": false}
        )
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    
      

        // componentDidMount() {
  //   API.updateFieldBeach("5b7aef7d01ca7ef0dc408175", {"beachloc":{
	//     "lat": 55,
	//     "lng": 555
	// }})
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
        
   
    handleSelectChange = (event) => {
        this.setState({
          location: event.target.value
        })
        console.log(this.state.location)

      }



      getBeaches = () => {
        API.getListOfBeaches()
            .then(res => {
                this.setState({ beaches: res.data })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

  


render(){
    return <div className="container">
        <label name="Beach">Choose a Beach</label>
        <select onClick={this.handleSelectChange}>
            {this.state.beaches.map(beach=>(
                <option key={beach.spot_id}>{beach.spot_name}</option>
            ))}
        </select>
        <button className="avail-btn btn btn-success" onClick={this.handleButtonCLick}>I&#39;m available to teach, Bruh!</button>
        <button className="not-avail-btn btn btn-success" onClick={this.handleButtonCLickNotAvailable}>I&#39;m <span style={{textDecoration: 'underline'}}>not</span> available to teach, Bruh!</button>
    </div>
}
}
export default goAvailable