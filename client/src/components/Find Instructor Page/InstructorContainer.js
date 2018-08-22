import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom'


const InstructorContainer= (props)=>{
    return (
        
            <div className="container" style={{backgroundColor:"lightgray", opacity: ".8", borderRadius: "20px"}}>
                {props.instructors.map(instructor => (
                    
                        <Link instructorId={instructor._id} to={`/viewprofile/${instructor._id}`}>
                    <div key={instructor._id} className="row">
                        <div className="col-md-2">
                            <img className="img-fluid" src={instructor.picURL} alt={instructor.firstName} />
                        </div>
                        <div>
                            <ul>
                                <li>{instructor.firstName} {instructor.lastName}</li>
                                <li>Experience Level: {instructor.exp}</li>
                                <li>Bio: {instructor.bio}</li>
                                <li>Rating: {instructor.rating}</li>
                            </ul>
                        </div>
                    </div>
                    </Link>
                   
                ))}
            </div>
            
    )

}

export default InstructorContainer