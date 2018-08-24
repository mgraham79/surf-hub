import React, { Component } from "react";
import "./Report.css";
import Nav from "../Nav";
import withAuth from '../withAuth';
import FindInstructorButton from "../findInstructorButton/FindInstructorButton"
import API from "../../utils/API"
import ForecastContainer from "../Report/ForecastContainer"
import {LineChart, AreaChart} from "react-chartkick"
import Chart from "chart.js"

class Report extends Component {
    state = {
        beaches: [],
        location: "",
        forecast: [],
        waveHeight: [],
        maxWaveHeight: 0,
        minWaveHeight: 0
    }
    // have a function that goes to the api that give us nearest beaches
    //spitcast API Endpoint api/spot/nearby?longitude=...?latitude=...

    componentDidMount() {
        this.getBeaches()
        console.log(this.state.beaches)
    }

    handleButtonCLick = () => {
        API.getForecast(this.state.location)
            .then(result => {
                this.setState({ forecast: result.data })
                
                // Creating an Array of Wave Heights
                const NewWaveHeight = forecast.map(function(princess) {
                    return forecast.size;
                  });
                  this.setState({ waveHeight: NewWaveHeight })
                  console.log("Wave Heights (ft): ", waveHeight);

                  // Determining the maximum wave height
                  maxWaveHeight = Math.max(...waveHeight);

                  // Determining the minimum wave height
                  minWaveHeight = Math.min(...waveHeight);

                console.log(result.data)
            })
        console.log(this.state.forecast)

    }



    handleSelectChange = (event) => {
        let selectedLocationKey = event.target.value;
        console.log(event.target.value)
        this.setState({
            location: selectedLocationKey
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
        return (
            <div>
                <Nav />

                <div className="container" id="bg" style={{ marginTop: "20px" }}>
                <h1>Surf Report</h1>
                    <label name="Beach">Choose a Beach</label>
                    <select value={this.state.location} onChange={this.handleSelectChange}>
                    {this.state.beaches.map(beach => (
                        <option key={beach.spot_id} value={beach.spot_id}>{beach.spot_name}</option>
                    ))}
                    </select>&#160;
                    <button className="btn btn-success" onClick={this.handleButtonCLick}>Go</button>
                    <ForecastContainer 
                        forecast={this.state.forecast}
                        waveHeight={this.state.waveHeight}
                        maxWaveHeight={this.state.maxWaveHeight}
                        minWaveHeight={this.state.minWaveHeight}
                        
                    />
            </div>
        </div >
    )

    }


}
export default Report;
//export default withAuth(Report)