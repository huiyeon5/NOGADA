import React, { Component } from 'react';
import './App.css';
import About from '../About/About';
import Landing from '../Landing/Landing';
import Info from '../Info/Info';
import DataViz1 from '../Test/DataViz1'
import {Route,NavLink,BrowserRouter} from "react-router-dom";


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
    if(!this.state.direct){
      return (
        <div className="App">
          <Landing click={this.handleClick}/>
          <Info />
          <About />        
        </div>
      );
    }else{
      return(
        <div>
        <BrowserRouter>
        <div>
          <h1>Data Visualisation</h1>
          <ul className="header">
            <li><NavLink to="/Test/DataViz1">DataViz1</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/Test/DataViz1" component={DataViz1}/>
          </div>
        </div>
        </BrowserRouter>  
        </div>
      );
    }
  }
}

export default App;
