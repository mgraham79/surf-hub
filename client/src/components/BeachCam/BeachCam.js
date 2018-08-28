import React from "react";
import "./Videos.css";
import Nav from "../Nav";
import withAuth from '../withAuth';
import FindInstructorButton from "../findInstructorButton/FindInstructorButton"


const Videos = () => (
    <div>
        <Nav />
        <FindInstructorButton />
        <div className="container">

            <div id="bg">
                <h1>Instructional Videos</h1>
                <div className="row">
                    <div className="col-sm">
                        <form name="cityselect">
                            <select name="menu" onChange="window.document.location.href=this.options[this.selectedIndex].value;" value="GO">
                                <option selected="selected">Select One</option>
                                <option value="http://www.leeds.com">Leeds</option>
                                <option value="http://www.manchester.com">Manchester</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div  className="col-sm">&nbsp;</div>
                </div>
                <div className="row">
                    <div className="col-sm">

                    </div>

                </div>
            </div>
        </div>
    </div>
);
export default BeachCam;
//export default withAuth(BeachCam)