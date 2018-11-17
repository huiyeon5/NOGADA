import React, { Component } from 'react';  
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart} from "recharts";
import './DataViz2.css';  
import Stay from '../Stay/Stay';

class DataViz2 extends Component {  

    constructor(props){
        super(props);
        this.state = {
            purpose:null,
            gender: []
        };

        // this.changeText = this.changeText.bind(this);
    }
  
    componentDidMount(){
        this.callBackendAPI('/get_all_purpose')
            .then(res => {
                let datas = res.data;
                datas.forEach(function(d){
                    d['label'] = d['label'].slice(0,10);
                    d['Business'] = Math.round(d['Business'] * 100) / 100;
                    d['Commerce'] = Math.round(d['Commerce'] * 100) / 100;
                    d['Tourism'] = Math.round(d['Tourism'] * 100) / 100;
                    d['Education'] = Math.round(d['Education'] * 100) / 100;
                    d['Others'] = Math.round(d['Others'] * 100) / 100;
                })
                this.setState({ purpose: datas })
            })
            .catch(err => console.log(err));

        this.callBackendAPI('/get_gender')
            .then(res => {
                let datas = res.data;
                datas.forEach(function(d){
                    d.forEach(function(dd){
                        dd['avg'] = Math.round(dd['avg'] * 100) / 100;
                    })
                })
                let stateList = []
                stateList.push(datas[0]);
                stateList.push(datas[1]);
                this.setState({gender: stateList});
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


    render() {  
        
        return (
            <div className="dataviz2">
                <div className="LineChart">
                    <LineChart width={650} height={250} data={this.state.purpose} className="line">
                        <CartesianGrid strokeDasharray="2 2"/>
                        <XAxis dataKey="label"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Business" stroke="#8884d8" activeDot={{r: 3}} dot={false}/>
                        <Line type="monotone" dataKey="Commerce" stroke="#82ca9d" dot={false}/>
                        <Line type="monotone" dataKey="Education" stroke="#8e44ad" dot={false}/>
                        <Line type="monotone" dataKey="Others" stroke="#e74c3c" dot={false}/>
                        <Line type="monotone" dataKey="Tourism" stroke="#f39c12" dot={false}/>
                    </LineChart>
                </div>
                <div className="genderchart">
                    <BarChart width={280} height={250} data={this.state.gender[0]} className="Female" layout="vertical" syncId="anyId">
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis type="number" />
                        <YAxis orientation="left" dataKey="age_group" type="category" hide={true} tick={true}/>
                        <Tooltip labelStyle={{transform: "rotateY(180deg)"}} itemStyle={{transform:"rotateY(180deg)"}}/>
                        <Legend wrapperStyle={{
                            transform: "rotateY(180deg)"
                        }} payload={[{value:"Avg. of Females", type: 'line', id: 'ID01'}]}/>
                        <Bar dataKey="avg" fill="#ee7989" />
                    </BarChart>
                    <BarChart width={350} height={250} data={this.state.gender[1]} className="Male" layout="vertical" syncId="anyId">
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis type="number"/>
                        <YAxis dataKey="age_group" type="category"/>
                        <Tooltip />
                        <Legend payload={[{value:"Avg. of Males", type: 'line', id: 'ID01'}]}/>
                        <Bar dataKey="avg" fill="#4682b4" />
                    </BarChart>
                </div>
                <Stay />
            </div>
        );
    }  
}  
  
  
export default DataViz2;