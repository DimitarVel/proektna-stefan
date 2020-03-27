import React from 'react'
import Axios from 'axios'
import './Home.css'
import PostCard from './PostCard'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        Axios.get("http://localhost:5000/api/get_all_posts")
        .then(data => {
            const posts = data.data.posts
            console.log(data)
            this.setState({posts})
            console.log(this.state.posts)
        })
    }

    render() {

        const posts = this.state.posts.map(post => {
            return (<PostCard title={post.post_title} body={post.post_body} id={post.post_id} />)
        })

        return (
            <div id="Home">
                {posts}
            </div>
        )
    }
}

export default Home