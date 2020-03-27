import React from 'react'
import {Link} from 'react-router-dom'

const PostCard = (props) => {
    return (
        <div className="postCard">
            <h2>{props.title}</h2>
            <p>{(props.body).substring(0, 350) + '...'}</p>
            <Link to={"/post/" + props.id}>Read More </Link>
        </div>
    )
}

export default PostCard