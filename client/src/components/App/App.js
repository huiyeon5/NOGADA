import React, { Component } from 'react';
import './App.css';
import About from '../About/About';
import Landing from '../Landing/Landing';
import Info from '../Info/Info';

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
      return <div onClick={this.handleClick}>HELLOOOO</div>
    }
  }
}

export default App;
