import React, {Component} from 'react';
import './Scroll.css';

class Scroll extends Component {
    render(){
        return(
            <div className="Scroll">
                <div className="container">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <span className="text">Scroll down</span>
                </div>
            </div>
        );
    }
}

export default Scroll;