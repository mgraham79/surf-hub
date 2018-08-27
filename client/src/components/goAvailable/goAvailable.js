import React, { Component } from "react"
import API from "../../utils/API"
import "./goAvailable.css"
import Nav from "../Nav"
import withAuth from "../withAuth"


class goAvailable extends Component {
    state = {
        beaches: [],
        location: 0
    }
   

    componentWillMount() {
        this.getBeaches()
        console.log(this.state.beaches)
    }


    handleButtonCLick = () => {
        console.log(this.state.location)
        const newData = {
            location: this.state.location.replace(/ /g, "_"),
            available: "true",
            reserved: "false"
        }
        API.updateFieldUser(this.props.user.id, newData)
            .then(res => {
                console.log(res.data)
                console.log("Available")
            })
            .catch(err => console.log(err))
            this.props.history.replace("/home")
    }

    handleButtonCLickNotAvailable = () => {
        console.log(this.state.location)
        const newData = {
            location: this.state.location.replace(/ /g, "_"),
            available: "false",
            reserved: "false"
        }
        API.updateFieldUser(this.props.user.id, newData)
            .then(res => {
                console.log(res.data)
                console.log("Not Available")
            })
            .catch(err => console.log(err))
            this.props.history.replace("/home")
    }



    handleSelectChange = (event) => {
        this.setState({
            location: event.target.value
        })
        console.log(this.state.location)

    }



    getBeaches = () => {
        API.getListOfBeaches()
            .then(res => {
                const beachList = [{ spot_id: 12345, spot_name: 'Select a beach' }, ...res.data]
                this.setState({ beaches: beachList })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }




    render() {
        return <div>
            <Nav />
            <div className="container">
                <label name="Beach">Choose a Beach</label>
                <select onClick={this.handleSelectChange}>
                    {this.state.beaches.map(beach => {
                        if (beach.spot_id === 12345) {
                            return <option selected disabled key={beach.spot_id}>{beach.spot_name}</option>
                        }
                        return <option key={beach.spot_id}>{beach.spot_name}</option>
                    })}
                </select>
                <button className="avail-btn btn btn-success" onClick={this.handleButtonCLick}>I&#39;m available to teach, Bruh!</button>
                <button className="not-avail-btn btn btn-success" onClick={this.handleButtonCLickNotAvailable}>I&#39;m <span style={{ textDecoration: 'underline' }}>not</span> available to teach, Bruh!</button>
            </div>
        </div>
    }
}
export default withAuth(goAvailable)