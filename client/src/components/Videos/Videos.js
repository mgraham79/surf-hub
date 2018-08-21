import React from "react";
import "./Videos.css";
import Nav from "../Nav";

const Videos = () => (
    <div>
        <Nav />
        <div className="container">

            <div id="bg">
                <div className="row">
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/c6yOxWf3A6g?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                            allowfullscreen></iframe>
                    </div>
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/l14Y9siG0LU?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                            allowfullscreen></iframe>
                    </div>
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/dBmHlpliXfk?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <div>&nbsp;</div>
                <div className="row">
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/73hmhBxJ0eE?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                            allowfullscreen></iframe>
                    </div>
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/Qm9gUa5VXm4?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                            allowfullscreen></iframe>
                    </div>
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/KCLWvAcPcPk?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <div>&nbsp;</div>
                <div className="row">
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/ol7_263urLg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/w1D_7Fq5VFo?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    <div className="col-sm">
                        <iframe width="300" height="168" src="https://www.youtube.com/embed/mtYT603Wrcc?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default Videos;