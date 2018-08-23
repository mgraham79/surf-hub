import React from "react"
import "./Report.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'



const ForecastContainer = (props) => {
    return (

        <div className="container">
            <div><br />&#160;</div>
<div className="row">
            <div id="ex3" className="col col-lg-6">
                {props.forecast.map(report => (


                    <div key={report._id} className="row">

                        <div >

                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td align="center">&#160; {report.date}</td>
                                        <td align="center">Hour: <br />{report.hour}</td>
                                        <td align="center">Wave Size: <br />{report.size}ft</td>
                                        <td align="center">Wave Shape: <br />{report.shape_full}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>



                ))}
            </div>
            <div className="col col-lg-4">{/*Kevin This is where you place your graph!*/ }</div>
            </div>
        </div>


    )

}

export default ForecastContainer