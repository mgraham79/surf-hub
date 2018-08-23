import React from "react";
import "./Report.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {LineChart, AreaChart} from "react-chartkick"

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
          <AreaChart
            data={{
              "2017-01-01 00:00:00 -800": 1,
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
            }}
          />

          <AreaChart
            title="Chart Title"
            xtitle="Time (hours)"
            ytitle="Wave Height (ft)"
          />
        </div>
      </div>
    </div>
  );
};

export default ForecastContainer;
