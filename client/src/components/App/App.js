import React, { Component } from 'react';
import './App.css';
import Start from '../Start/Start';
import Dashboard from '../Dashboard/Dashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        direct: false
        };
    }

    handleClick = () => {
        this.setState({direct: !this.state.direct});
    };


    render() {
        return(
            <Router>
                <div>
                    <Route exact={true} path="/" component={Start} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </div>
            </Router>
        );
    }
}

export default App;
