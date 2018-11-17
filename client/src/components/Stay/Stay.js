import React, { Component } from 'react';  
import './Stay.css';
class Stay extends Component{
    constructor(props){
        super(props);
        this.state = {
            avg:0
        }
    }

    componentDidMount(){
        this.callBackendAPI('/get_all_stay')
            .then(res => {
                let avg = Math.round(res.data[0]['avg'] * 100) / 100;
                this.setState({ avg })
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async (url) => {
        const response = await fetch(url);
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    render(){
        return (
            <div className="Stay">
                <span className="length">Average Length of Stay: </span>
                <span className="day">{this.state.avg} days</span>
            </div>
        )
    }
}

export default Stay;