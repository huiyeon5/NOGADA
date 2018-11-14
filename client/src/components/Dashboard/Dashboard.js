import React, { Component } from 'react';  
import logo from './NogadaFinal.png';
import DataViz1 from '../DataViz1/DataViz1';
import DataViz2 from '../DataViz2/DataViz2';
import DataViz3 from '../DataViz3/DataViz3';
import MainMenu from '../MainMenu/MainMenu';
import './Dashboard.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSnowflake} from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import Head from '../Head/Head';

library.add(faHome, faSnowflake);

class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
        this.changeText = this.changeText.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.bye = this.bye.bind(this);
        this.state = {
            index:1
        };
    }

    goHome(){
        window.location = '/'
    }

    changeText(){
        if(this.state.index === 1){
            return "Seasonal Trend in Korean Tourism Industry";
        }else if(this.state.index === 2){
            return "Demographic Information of Korean Tourism Industry";
        }else{
            return "Geo-spatial view of Popular Tourist Attractions";
        }
    }
     
    bye(){
        setTimeout(function(){
            document.querySelector('.loading').style.display = 'none';
        },5000)
    }

    setIndex(index){
        this.setState({index});
    }

    render() {
        var visual;
        if(this.state.index === 1){
            visual = <DataViz1 />
        }else if(this.state.index === 2){
            visual = <DataViz2 />
        }else{
            visual = <DataViz3 />
        }
        return ( 
            <div className="dashboard-div" onLoad={this.bye}>
                <div className="loading" >
                    <ReactLoading type={"spinningBubbles"} color={"#00c484"} className="loader"/> 
                </div>
                <div className="Dashboard">
                    <Head headtext={this.changeText()} />
                    <div className="sidebar">
                        <div className="logoimage">
                            <img src={logo} alt="" className="logo"/>
                        </div>
                        <div className="gohome" onClick={this.goHome}>
                            <FontAwesomeIcon icon="home" className="home-icon"/>
                        </div>
                        <MainMenu setIndex={this.setIndex} />
                    </div>
                    <div className="mainpage">
                        {visual}
                    </div>
                </div>
            </div>  
        );  
    }  
}  
  
  
export default Dashboard;