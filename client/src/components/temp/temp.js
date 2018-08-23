import React, { Component } from "react"
import API from "../../utils/API"
import Beaches from "../../beaches/beachesJson"
import InstructorContainer from "./InstructorContainer"
import Nav from "../Nav"
import {LineChart, AreaChart} from 'react-chartkick'

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
        return <div> 
            <Nav/>
        <div className="container" style={{marginTop: "20px"}}>
            <label name="Beach">Choose a Beach</label>
            <select value={this.state.location} onChange={this.handleSelectChange}>
                {this.state.beaches.map(beach => (
                    <option key={beach.spot_id} value={beach.spot_name}>{beach.spot_name}</option>
                ))}
            </select>
            <button className="btn btn-success" onClick={this.handleButtonCLick}>Go</button>
        
        
        <InstructorContainer instructors={this.state.instructors}/>
        <div className="plotContainer">
        <AreaChart data={{"2017-01-01 00:00:00 -800": 1,
                        "2017-01-01 01:00:00 -800": 2,
                        "2017-01-01 02:00:00 -800": 3,
                        "2017-01-01 03:00:00 -800": 4,
                        "2017-01-01 04:00:00 -800": 5,
                        "2017-01-01 05:00:00 -800": 6,
                        "2017-01-01 06:00:00 -800": 7,
                        "2017-01-01 07:00:00 -800": 8,
                        "2017-01-01 08:00:00 -800": 9,
                        "2017-01-01 09:00:00 -800": 10,
                        "2017-01-01 10:00:00 -800": 11,
                        "2017-01-01 11:00:00 -800": 12,
                        "2017-01-01 12:00:00 -800": 13,
                        "2017-01-01 13:00:00 -800": 14,
                        "2017-01-01 14:00:00 -800": 15,
                        "2017-01-01 15:00:00 -800": 16,
                        "2017-01-01 16:00:00 -800": 17,
                        "2017-01-01 17:00:00 -800": 18,
                        "2017-01-01 18:00:00 -800": 19,
                        "2017-01-01 19:00:00 -800": 20,
                        "2017-01-01 20:00:00 -800": 21,
                        "2017-01-01 21:00:00 -800": 22,
                        "2017-01-01 22:00:00 -800": 23,
                        "2017-01-01 23:00:00 -800": 24,
                        "2017-01-01 24:00:00 -800": 25,
                        "2017-01-02 00:00:00 -800": 26
                        }} />

                        <AreaChart title="Chart Title" xtitle="Time (hours)" ytitle="Wave Height (ft)" />
        
        </div>

        </div>
        </div>
    }
}
export default FindInstructorPage