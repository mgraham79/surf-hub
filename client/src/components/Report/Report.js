import React, { Component } from "react";
import "./Report.css";
import Nav from "../Nav";
import withAuth from '../withAuth';
import FindInstructorButton from "../findInstructorButton/FindInstructorButton"
import API from "../../utils/API"
import ForecastContainer from "../Report/ForecastContainer"

class Report extends Component {
    state = {
        beaches: [],
        location: "",
        forecast: []
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
                console.log(result.data)
            })
        console.log(this.state.forecast)

    }



    handleSelectChange = (event) => {
        let selectedLocationKey = event.target.key;
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

                <div className="container" style={{ marginTop: "20px" }}>
                    <label name="Beach">Choose a Beach</label>
                    <select value={this.state.location} onChange={this.handleSelectChange}>
                    {this.state.beaches.map(beach => (
                        <option key={beach.spot_id} value={beach.spotID}>{beach.spotID}</option>
                    ))}
                    </select>
                    <button className="btn btn-success" onClick={this.handleButtonCLick}>Go</button>
                    <ForecastContainer forecast={this.state.forecast}/>
            </div>
        </div >
    )

    }


}
export default Report;
//export default withAuth(Report)