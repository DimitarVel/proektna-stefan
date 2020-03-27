import React from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            loginError: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (e) => {
        e.preventDefault()
        const user = {
            "username": this.state.username,
            "password": this.state.password
        }
        Axios.post("http://localhost:5000/api/login", user)
        .then(res => {
            const data = res.data
            if(data.error_code !== "200")
                this.setState({loginError: data.error_message})
            else {
                localStorage.setItem("user_id", data.user.user_id)
                this.props.history.push("/")
                this.props.changeNav()
            }
        })
    }

    render() {
        return (
            <form id="login" className="form" onChange={this.handleChange}>
                <h2>Login:</h2>
                <label htmlFor="username"> Username: </label>
                <input type="text" name="username" value={this.state.username} />
                <br />
                <label htmlFor="password"> Password: </label>
                <input type="password" name="password" value={this.state.password} />
                <br />
                <button onClick={this.login}>Login</button>
                {this.state.loginError.length > 0 ? (<span>{this.state.loginError}</span>) : false}
            </form>
        )
    }
}

export default withRouter(Login)
