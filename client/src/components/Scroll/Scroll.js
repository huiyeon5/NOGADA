import React, {Component} from 'react';
import './Scroll.css';

class Scroll extends Component {
    render(){
        return(
            <div className="Scroll">
                <div class="container">
                    <div class="chevron"></div>
                    <div class="chevron"></div>
                    <div class="chevron"></div>
                    <span class="text">Scroll down</span>
                </div>
            </div>
        );
    }
}

export default Scroll;