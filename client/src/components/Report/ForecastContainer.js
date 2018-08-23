import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'


const ForecastContainer = (props) => {
    return (

        <div className="container" style={{ backgroundColor: "lightgray", opacity: ".7", borderRadius: "20px" }}>
            {props.forecast.map(report => (


                <div key={report._id} className="row">

                    <div>
                        <ul>
                            <li style={{ textDecoration: "none" }}>{report.date}</li>
                            <li style={{ textDecoration: "none" }}>Hour: {report.hour}</li>
                        </ul>
                    </div>
                </div>

            ))}
        </div>

    )

}

export default ForecastContainer