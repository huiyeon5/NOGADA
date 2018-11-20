import React, { Component } from 'react';  
import './Stay.css';
class Stay extends Component{
    render(){
        return (
            <div className="Stay">
                <span className="length">Average Length of Stay: </span>
                <span className="day">{this.props.avg} days</span>
            </div>
        )
    }
}

export default Stay;