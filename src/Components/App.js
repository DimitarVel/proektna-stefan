import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Nav from './Nav/Nav'
import Home from './Home/Home'
import Welcome from './Welcome/Welcome'
import AddPost from './AddPost/AddPost'
import Post from './Post/Post'
import "./App.css"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            ch: false
        }
    }

    changeNav =() => {
        this.setState({ch: true})
        this.setState({ch: false})
    }
    render() {
        return (
            <div id="App">
                <Router>
                    <Nav renderNav={this.navSet}/>
                    <Route exact path="/" component={Home} />
                    <Route path="/welcome" component={
                        () => <Welcome changeNav={this.changeNav} />
                    } />
                    <Route path="/createPost" component={AddPost} />
                    <Route path="/post/:post_id" component={Post} />
                </Router>
            </div>
        )
    }
}

export default App