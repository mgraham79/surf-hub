import React, { Component } from "react"
import API from "../../utils/API"
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
        localStorage.setItem("user", "5b7cf350ce82af16010bcd41");
    }

  
    handleButtonCLick= ()=>{
        console.log(this.state.location)
        const newData = {
            location: this.state.location,
            available: "true"
        }
        API.updateFieldUser(localStorage.getItem("user"), newData)
        .then(res => {
            console.log(res.data)
            console.log("Available")
        })
        .catch(err => console.log(err))
    }

    handleButtonCLickNotAvailable= ()=>{
        console.log(this.state.location)
        const newData = {
            location: this.state.location,
            available: "false"
        }
        API.updateFieldUser(localStorage.getItem("user"), newData)
        .then(res => {
            console.log(res.data)
            console.log("Not Available")
        })
        .catch(err => console.log(err))
    }
    
        
   
    handleSelectChange = (event) => {
        this.setState({
          location: event.target.value
        })
        console.log(this.state.location)

      }



      getBeaches = () => {
        API.getListOfBeaches()
            .then(res => {
                const beachList = [{spot_id: 12345, spot_name: 'Select a beach'}, ...res.data]
                this.setState({ beaches: beachList })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

  


render(){
    return <div className="container">
        <label name="Beach">Choose a Beach</label>
        <select onClick={this.handleSelectChange}>
            {this.state.beaches.map(beach=>{
                if(beach.spot_id === 12345){
                   return <option selected disabled key={beach.spot_id}>{beach.spot_name}</option> 
                }
               return <option key={beach.spot_id}>{beach.spot_name}</option>
            })}
        </select>
        <button className="avail-btn btn btn-success" onClick={this.handleButtonCLick}>I&#39;m available to teach, Bruh!</button>
        <button className="not-avail-btn btn btn-success" onClick={this.handleButtonCLickNotAvailable}>I&#39;m <span style={{textDecoration: 'underline'}}>not</span> available to teach, Bruh!</button>
    </div>
}
}
export default goAvailable