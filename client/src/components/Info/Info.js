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
                        <p className="section-para">Over the years, the tourism sector has been an essential part of South Korea’s growth, with over 17 million of foreign tourists having reached Korea in 2016.By 2022, some of the goals that KTO aims to reach is to receive earnings of USD$ 25 billion to boost its national economy, attract over 350 thousands of tourism industry employees, and become the best public enterprise. <br/><br/> With in this mind, KTO is currently working to improve the quality of tourism experience of international visitors and maximize the economic contribution in the long term</p>
                    </div>
                </div>
                <div className="section section2">
                    <img src={require('./Objectives.png')} alt="" srcSet="" className="info-image"/>
                    <div className="section-description">
                        <h3 className="section-header">Objectives</h3>
                        <hr className="two"/>
                        <p className="section-para">The objectives we hope to address through this project are as follows:
                        <ol>
                            <li> &nbsp; Gain overall insight on the monthly visitor arrivals and seasonal trend to South Korea over the last 10 years.</li>
                            <li> &nbsp; Identify popular tourism destinations in different regions of Korea and the yearly trend of the tourism destinations. </li>
                            <li> &nbsp; Gain insights on the purpose of visit and other demographic information of the international visitors.</li>
                        </ol>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;