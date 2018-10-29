import React, { Component } from 'react';  
import {BrowserRouter as Router,Route} from 'react-router-dom';
import logo from './NogadaFinal.png';
import DataViz1 from '../DataViz1/DataViz1';
import DataViz2 from '../DataViz2/DataViz2';
import DataViz3 from '../DataViz3/DataViz3';
import MainMenu from '../MainMenu/MainMenu';
import Button from '../Button/Button';

class Dashboard extends Component {  

    render() {  
        return (  
            <Router>    
                <div className="Dashboard">
                    <img src={logo} alt=""/>
                    <Button direct={"/"} text={"Home"} class={["dash", "dash-button"]}/>
                    <MainMenu />
                    <div>
                        <Route exact path="/dashboard1" component={DataViz1} />
                        <Route exact path="/dashboard2" component={DataViz2} />
                        <Route exact path="/dashboard3" component={DataViz3} />
                    </div>
                </div>
            </Router>
        );  
    }  
}  
  
  
export default Dashboard;