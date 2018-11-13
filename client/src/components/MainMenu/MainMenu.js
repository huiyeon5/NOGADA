import React, { Component } from 'react';  
import './MainMenu.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faUsers, faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';

library.add(faSnowflake, faUsers, faGlobeAmericas);

class MainMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 1
        }
    }

    changeActive(i){
        var index = 1;
        var buttons = document.querySelectorAll('.menuDiv');
        buttons.forEach(b => {
            if(index === i){
                b.classList.add('active');
            }else{
                if(b.classList.contains('active')){
                    b.classList.remove('active');
                }
            }
            index++;
        });
    }

    render() {  
        return (
            <div className="MainMenu">
                <div className="menuDiv active" onClick={() => {
                                        this.props.setIndex(1)
                                        this.changeActive(1)
                                    }}>
                    <FontAwesomeIcon icon="snowflake" className="buttonLogo"/>
                    <button className="menuButton">Dashboard 1</button>
                </div>
                <div className="menuDiv" onClick={() => {
                                        this.props.setIndex(2)
                                        this.changeActive(2)
                                    }}>
                    <FontAwesomeIcon icon="users" className="buttonLogo"/>
                    <button className="menuButton">Dashboard 2</button>
                </div>
                <div className="menuDiv" onClick={() => {
                                        this.props.setIndex(3)
                                        this.changeActive(3)
                                    }}>
                    <FontAwesomeIcon icon="globe-americas" className="buttonLogo"/>
                    <button className="menuButton">Dashboard 3</button>
                </div>
            </div>
        );
    }  
}  
  
  
export default MainMenu;