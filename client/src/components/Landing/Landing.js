import React, {Component} from 'react';
import './Landing.css';
import Button from '../Button/Button';
import BackgroundSlideshow from 'react-background-slideshow'
import image1 from './background1.jpg';
import image2 from './background2.jpg';
import image3 from './background3.jpg';
import image4 from './background4.jpg';
import image5 from './background5.jpg';
import image6 from './background6.jpg';
import Scroll from '../Scroll/Scroll'

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 1,
            text: "Sungnyemun"
        }
        this.changeText = this.changeText.bind(this)
    }

    componentDidMount(){
        document.querySelector(".htmlloader").style.display = 'none';

        setTimeout(function () {
            let tag = document.querySelector('.headers');
            tag.setAttribute('style','opacity:1; transform: translateY(0px);');
        }, 50);
    }

    changeText() {
        if(this.state.index === 0){
            this.setState({
                index: 1,
                text:"Sungnyemun"
            })
        }else if(this.state.index === 1){
            this.setState({
                index:2,
                text: "Han River"
            });
        }else if(this.state.index === 2){
            this.setState({
                index:3,
                text: "Dongdaemun"
            });
        }else if(this.state.index === 3){
            this.setState({
                index:4,
                text: "Gyeongbokgonng"
            });
        }else if(this.state.index === 4){
            this.setState({
                index:5,
                text: "Samsung HQ"
            });
        }else if(this.state.index === 5){
            this.setState({
                index:0,
                text: "Korean Flag"
            });
        }
    }

    render() {
        return (
            <header className="landing">
                <BackgroundSlideshow 
                        images={[image1,image2,image3,image4,image5,image6]} 
                        animationDelay={3000} 
                        startAt={0}
                        onChange={this.changeText}/>
                <div className="headers">
                    <h1 className="title">NO.G.A.D.A</h1>
                    <h2 className="tag"><i>Visualizing Korean Tourism</i></h2>
                </div>
                <div className="Pic-text"><span>{this.state.text}</span></div>
                <Button direct={"/dashboard"} text={"Take me there!"} class={["dash", "dash-button"]}/>
                <Scroll />
            </header>
        )
    }
}

export default Landing;