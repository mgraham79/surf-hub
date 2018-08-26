import React, { Component } from "react";
import "./Report.css";
import Nav from "../Nav";
import withAuth from "../withAuth";
import FindInstructorButton from "../findInstructorButton/FindInstructorButton";
import API from "../../utils/API";
import ForecastContainer from "./ForecastContainer";
import { LineChart, AreaChart } from "react-chartkick";
import Chart from "chart.js";

class Report extends Component {
  state = {
    beaches: [],
    location: "",
    forecast: [],
    waveHeight: [],
    maxWaveHeight: 0,
    minWaveHeight: 0,
    chartObj: [],
  };
 

  componentDidMount() {
    this.getBeaches();
    console.log("component did mount: ", this.state.beaches);
  }

  handleButtonCLick = () => {
    API.getForecast(this.state.location).then(result => {
      this.setState({ forecast: result.data });
      console.log("Forecast: ", this.state.forecast);

      // Creating an Array of Wave Heights
      const NewWaveHeight = result.data.map(forecastData => {
        return forecastData.size_ft;
      });

      this.setState({ waveHeight: NewWaveHeight })
      //console.log("Wave Heights (ft): ", waveHeight);

      // Determining the maximum wave height
      const NewMaxWaveHeight = Math.max(...NewWaveHeight);
      this.setState({ maxWaveHeight: NewMaxWaveHeight })
      console.log("maxWaveHeight (ft): ", this.state.maxWaveHeight);

      // Determining the minimum wave height
      const NewMinWaveHeight = Math.min(...NewWaveHeight);
      this.setState({ minWaveHeight: NewMinWaveHeight })
      console.log("minWaveHeight (ft): ", this.state.minWaveHeight);

      // console.log(result.data)
      let newObj = {};
      result.data.map(data => {
        const hour = data.hour;
        const height = data.size_ft;
        newObj[hour] = height
        // console.log(newObj);
        this.setState({ chartObj: newObj })
      });
    });
    console.log("Total Forecast: ", this.state.forecast);
  };

  handleSelectChange = event => {
    let selectedLocationKey = event.target.value;
    console.log(event.target.value);
    this.setState({
      location: selectedLocationKey
    });
  };


  getBeaches = () => {
    API.getListOfBeaches()
      .then(res => {
        this.setState({ beaches: res.data });
        console.log("Beaches: ", res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav />
        <FindInstructorButton />
        <div className="container" id="bg" style={{ marginTop: "20px" }}>
          <div id="DataSource">
            <h1>Surf Report</h1>
            Data Source: Spitcast<br></br>
            <div id="SpitcastLink"><a href=" http://www.spitcast.com/">www.spitcast.com</a></div>
          </div>
          <label name="Beach">Choose a Beach</label>
          <select
            value={this.state.location}
            onChange={this.handleSelectChange}
          >
            {this.state.beaches.map(beach => (
              <option key={beach.spot_id} value={beach.spot_id}>
                {beach.spot_name}
              </option>
            ))}
          </select>
          &#160;
          <button className="btn btn-success" onClick={this.handleButtonCLick}>
            Go
          </button>
          {<ForecastContainer
            chartObj={this.state.chartObj}
            forecast={this.state.forecast}
            waveHeight={this.state.waveHeight}
            maxWaveHeight={this.state.maxWaveHeight}
            minWaveHeight={this.state.minWaveHeight}
          />}
        </div>
      </div>
    );
  }
}
export default Report;

