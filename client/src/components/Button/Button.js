import React, {Component} from 'react';
import './Button.css';

class Button extends Component{
    render() {
        return (
            <div className={`${this.props.class}`} onClick={this.props.click}>
                <span className="buttontext">{this.props.text}</span>
            </div>
        );
    }
}

export default Button;