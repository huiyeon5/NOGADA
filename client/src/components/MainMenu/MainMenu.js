import React, { Component } from 'react';  
import {Link} from 'react-router-dom';
  
class MainMenu extends Component {
    render() {  
        return (
            <div className="MainMenu">
                <Link to="/dashboard1">
                    <button>Dashboard 1</button>
                </Link>
                <Link to="/dashboard2">
                    <button>Dashboard 2</button>
                </Link>
                <Link to="/dashboard3">
                    <button>Dashboard 3</button>
                </Link>
            </div>
        );
    }  
}  
  
  
export default MainMenu;