import React, { Component } from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            registerError: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    register = (e) => {
        e.preventDefault()
        this.setState({registerError : ""})
        if (this.state.password !== this.state.confirmPassword){
            this.setState({registerError: "Passwords dont match"})
            return
        }
        if (this.state.password.length < 6) {
            this.setState({registerError: "Password is too short"})
            return
        }
        if (this.state.username.length < 6) {
            this.setState({registerError: "Username is too short"})
            return
        }

        const user = {
            "username": this.state.username,
            "password": this.state.password
        }

        Axios.post("http://localhost:5000/api/register", user)
        .then(res => {
            const data = res.data
            if(data.error_code !== "200")
                this.setState({registerError: data.error_message})
            else {
                localStorage.setItem("user_id", data.user.user_id)
                this.props.history.push("/")
                this.props.changeNav()
            }
        })
    }
    render() {
        return (
            <form id="register" className="form" onChange={this.handleChange}>
                <h2>Register:</h2>
                <label htmlFor="username"> Username: </label>
                <input type="text" name="username" value={this.state.username} />
                <br />
                <label htmlFor="password"> Password: </label>
                <input type="password" name="password" value={this.state.password} />
                <br />
                <label htmlFor="confirmPassword"> Confirm Password: </label>
                <input type="password" name="confirmPassword" value={this.state.confirmPassword} />
                <br />
                <button onClick={this.register}>Register</button>
                {this.state.registerError.length > 0 ? (<span>{this.state.registerError}</span>) : false}
            </form>
        )
    }
}

export default withRouter(Register)