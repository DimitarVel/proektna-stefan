import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            ch: false
        }
    }

    logout =() => {
        localStorage.clear()
        this.setState({ch: true})
        this.setState({ch: false})
    }
    
    render() {
        
        return (
            <nav>
                <ul>
                    <li> <NavLink to="/">Home</NavLink> </li>
                    <li> <NavLink to="/createPost">Create Post</NavLink> </li>
                    <li> 
                        <NavLink to="/welcome" onClick={this.logout}>
                            {localStorage.getItem("user_id") === null ? ("Login or Register") : ("Logout")}
                        </NavLink> 
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav