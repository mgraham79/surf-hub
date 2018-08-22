import React, { Component } from "react"
import API from "../../utils/API"
import Beaches from "../../beaches/beachesJson"
import InstructorContainer from "./InstructorContainer"


class FindInstructorPage extends Component {
    state = {
        beaches: [],
        location: "",
        instructors:[]
    }
    // have a function that goes to the api that give us nearest beaches
    //spitcast API Endpoint api/spot/nearby?longitude=...?latitude=...

    componentWillMount() {
        this.getBeaches()
        console.log(this.state.beaches)
    }

    handleButtonCLick = () => {
        API.getUsersAtBeach(this.state.location)
            .then(result => {
                this.setState({instructors: result.data})
                console.log(result.data)
            })
            console.log(this.state.instructors)
         
    }



    handleSelectChange = (event) => {
        let selectedLocation = event.target.value;
        this.setState({
            location: selectedLocation
        });
    }



    getBeaches = () => {
        API.getListOfBeaches()
            .then(res => {
                this.setState({ beaches: res.data })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }



    render() {
        return <div className="container">
            <label name="Beach">Choose a Beach</label>
            <select value={this.state.location} onChange={this.handleSelectChange}>
                {this.state.beaches.map(beach => (
                    <option key={beach.spot_id} value={beach.spot_name}>{beach.spot_name}</option>
                ))}
            </select>
            <button className="btn btn-success" onClick={this.handleButtonCLick}>Go</button>
        
        
        <InstructorContainer instructors={this.state.instructors}/>
        </div>
    }
}
export default FindInstructorPage