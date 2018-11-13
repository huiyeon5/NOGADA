import React, { Component } from 'react';
import './App.css';
import Start from '../Start/Start';
import Dashboard from '../Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
                <Switch>
                    <Route exact path="/" component={Start} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

export default App;
