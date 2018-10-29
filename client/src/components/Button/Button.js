import React, {Component} from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

class Button extends Component{
    render() {
        return (
            <Link to={this.props.direct} className={this.props.class[0]}>
                <button className={this.props.class[1]}>{this.props.text}</button> 
            </Link>
        );
    }
}

export default Button;