import React, {Component} from 'react';
import Landing from '../Landing/Landing';
import Info from '../Info/Info';
import About from '../About/About';


class Start extends Component {

    componentDidMount() {
        setTimeout(function() {
            document.querySelector(".htmlloader").style.display = 'none';
        },5000);
    }

    render(){
        return (
            <div className="App">
                <Landing click={this.props.click}/>
                <Info />
                <About />        
            </div>
        )
    };
}

export default Start;