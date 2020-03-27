import React from 'react'
import "./Welcome.css"
import Register from './Register'
import Login from './Login'

export default function Welcome(props) {
    return (
        <div id="Welcome">
            <Login changeNav={props.changeNav} />
            <Register changeNav={props.changeNav} />
        </div>
    )
}
