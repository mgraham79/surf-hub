import React, { Component } from "react"
import API from "../../utils/API"
import Beaches from "../../beaches/beachesJson"


class FindInstructorPage extends Component {
    state= {
        beaches: [],
        location: 0
    }
    // have a function that goes to the api that give us nearest beaches
    //spitcast API Endpoint api/spot/nearby?longitude=...?latitude=...

   componentWillMount() {
       this.setState({beaches: Beaches});
        console.log(this.state.beaches)
        this.getBeaches()
    }
        
    handleButtonCLick= ()=>{


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
                this.setState({ beaches: res.data })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }



render(){
    return <div className="container">
        <label name="Beach">Choose a Beach</label>
        <select >
            {this.state.beaches.map(beach=>(
                <option onClick={this.handleSelectChange} key={beach.spot_id}>{beach.spot_name}</option>
            ))}
        </select>
        <button className="btn btn-success" onClick={this.handleButtonCLick}>Go</button>
    </div>
}
}
export default FindInstructorPage