import React, { Component } from 'react';
import './Head.css';

class Head extends Component{
    render(){
        return (
            <div className="Head">
                <span className="head-text">{this.props.headtext}</span>
            </div>
        );
    }
}

export default Head;