import React, {Component} from "react";

import "./Report.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { LineChart, AreaChart, ScatterChart } from "react-chartkick";
import Chart from "chart.js";

const ForecastContainer= (props)=>{
  console.log(props);
  
  
  console.log((props.forecast.length) ? props.forecast[0].spot_name : "");
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
        <div>

      <div id="ChartLocation">{(props.forecast.length) ? props.forecast[0].spot_name : ""}</div>

      <div id="ChartDate">{(props.forecast.length) ? props.forecast[0].date : ""}</div>

      <div id="ChartMaxMin">The Waves Range from {props.minWaveHeight.toFixed(1)} to {props.maxWaveHeight.toFixed(1)} feet</div>
      <AreaChart
        title="Wave Height During the Day"
        xtitle="Time (hours)"
        ytitle="Wave Height (ft)"
        data={props.chartObj}
      />
    </div>
        </div>
        
          {/* <div id="DataSource">
          <p>Data Source: Spitcast</p>
          <a href=" http://www.spitcast.com/">Spitcast Link</a>
          </div>
         */}
        </div> 
      </div>  
  );
};
export default ForecastContainer;
