import React from "react";
import "./Report.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { LineChart, AreaChart } from "react-chartkick";
import Chart from "chart.js";

const ForecastContainer = props => {
  return (
    <div className="container">
      <div>
        <br />
        &#160;
      </div>
      <div className="row">
        <div id="ex3" className="col col-lg-6">
          {props.forecast.map(report => (
            <div key={report._id} className="row">
              <div>
                <table class="table">
                  <tbody>
                    <tr>
                      <td align="center">&#160; {report.date}</td>
                      <td align="center">
                        Hour: <br />
                        {report.hour}
                      </td>
                      <td align="center">
                        Wave Size: <br />
                        {report.size}
                        ft
                      </td>
                      <td align="center">
                        Wave Shape: <br />
                        {report.shape_full}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div className="col col-lg-4">
          <div id="ChartLocation">{report.spot_name}</div>
          <div id="ChartDate">{report.date}</div>
          <div id="ChartMaxMin">The Waves Range from {props.minWaveHeight} to {props.maxWaveHeight} feet</div>
          <AreaChart
            title="Wave Height During the Day"
            xtitle="Time (hours)"
            ytitle="Wave Height (ft)"
            data={{
              "12am": props.waveHeight[0],
              "1am": props.waveHeight[1],
              "2am": props.waveHeight[2],
              "3am": props.waveHeight[3],
              "4am": props.waveHeight[4],
              "5am": props.waveHeight[5],
              "6am": props.waveHeight[6],
              "7am": props.waveHeight[7],
              "8am": props.waveHeight[8],
              "9am": props.waveHeight[9],
              "10am": props.waveHeight[9],
              "11am": props.waveHeight[10],
              "12pm": props.waveHeight[11],
              "1pm": props.waveHeight[12],
              "2pm": props.waveHeight[13],
              "3pm": props.waveHeight[14],
              "4pm": props.waveHeight[15],
              "5pm": props.waveHeight[16],
              "6pm": props.waveHeight[17],
              "7pm": props.waveHeight[18],
              "8pm": props.waveHeight[19],
              "9pm": props.waveHeight[20],
              "10pm": props.waveHeight[21],
              "11pm": props.waveHeight[22]
            }}
          />
          <div id="DataSource">
          <p>Data Source: Spitcast</p>
          <a href=" http://www.spitcast.com/">Spitcast Link</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastContainer;
