import React from 'react'
import "./AddPost.css"
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class AddPost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post_title: "",
            post_body: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitPost = e => {
        e.preventDefault()
        const data = {
            post: this.state,
            user: {
                user_id: localStorage.getItem("user_id")
            }
        }
        Axios.post("http://localhost:5000/api/create_post", data)
        .then(res => {
            const data = res.data

            if(data.error_code !== "200")
                console.log("Something went wrong. Please make sure you are logged in")
            else 
                this.props.history.push("/")
        })
    }

    render() {
        return (
            <div id="AddPost">
                <form>
                    <label>Post title: </label>
                    <input onChange={this.handleChange} type="text" name="post_title" />
                    <br />
                    <label>Post Body: </label>
                    <textarea onChange={this.handleChange} name="post_body"></textarea>

                    <button onClick={this.submitPost}>Submit Post</button>
                </form>
            </div>
        )
    }
}

export default withRouter(AddPost)