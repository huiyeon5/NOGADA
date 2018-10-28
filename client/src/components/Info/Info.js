import React, {Component} from 'react';
import './Info.css';

class Info extends Component {
    render(){
        return(
            <div className="Info">
                <h2 className="Infoheader">Our <b className="prob">Problem</b> & <b className="obj">Objective</b></h2>
                <div className="section section1">
                    <img src={require('./Problem.png')} alt="" srcSet="" className="info-image"/>
                    <div className="section-description">
                        <h3 className="section-header">Problem</h3>
                        <hr className="one"/>
                        <p className="section-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborums</p>
                    </div>
                </div>
                <div className="section section2">
                    <img src={require('./Objectives.png')} alt="" srcSet="" className="info-image"/>
                    <div className="section-description">
                        <h3 className="section-header">Objectives</h3>
                        <hr className="two"/>
                        <p className="section-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborums</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;