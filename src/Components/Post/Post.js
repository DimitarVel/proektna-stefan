import React from 'react'
import "./Post.css"
import Axios from 'axios'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post_title: "",
            post_body: ""
        }
    }

    componentDidMount = () => {
        Axios.get("http://localhost:5000/api/get_post?post_id=" + this.props.match.params.post_id)
        .then(res => {
            const post = res.data.post
            this.setState({
                post_title: post.post_title,
                post_body: post.post_body
            })
        })
    }

    render() {
        return (
            <div id="Post">
                {this.state.title === "" ? (<h2>Post not loaded</h2>) : (<div><h1>{this.state.post_title}</h1>
                <p>{this.state.post_body}</p></div>)}
                
            </div>
        )
    }
}
export default Post