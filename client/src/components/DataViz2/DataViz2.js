import React, { Component } from 'react';  
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart, Cell} from "recharts";
import './DataViz2.css';  
import Stay from '../Stay/Stay';
import MonthPicker from "@9softstudio/react-monthpicker";
import "@9softstudio/react-monthpicker/dist/reactmonthpicker.css";
import CustomizedAxisTick from '../CustomizedAxisTick/CustomizedAxisTick';

class DataViz2 extends Component {  

    constructor(props){
        super(props);
        this.state = this.getDefaultState();
    }

    getDefaultState() {
        return {
            purpose:null,
            gender: [],
            genPurpose:null,
            countries: [],
            fromMonth: 1,
            fromYear: 2008,
            toMonth:8,
            toYear:2018,
            selectedCountry: null,
            avg:0,
            selectedPurpose: null,
            purposeSelected: false,
            activeIndex: -1
        };
    }
  
    componentDidMount(){   
        this.callBackendAPI('/getCountries')
        .then(res => {
            let datas = res.data;
            let countries = []
            datas.forEach(function(d){
                countries.push(d['nationality']);
            })
            this.setState({countries});
            this.fillCountries();
        })
        .catch(err => console.log(err));

        if(this.state.selectedCountry === null){
            this.postData('/get_gender',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
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

            this.postData('/get_gender_purpose',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
                .then(res => {
                    let datas = res.data;
                    datas.forEach(function(d){
                        d['Female'] = Math.round(d['Female'] * 100) / 100;
                        d['Male'] = Math.round(d['Male'] * 100) / 100;
                    })
                    this.setState({genPurpose: datas});
                })
                .catch(err => console.log(err));
            
            
            this.postData('/get_all_purpose', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
                .then(res => {
                    let datas = res.data;
                    datas.forEach(function(d){
                        d['label'] = d['label'].slice(0,10);
                        d['Business/Commerce'] = Math.round(d['Business/Commerce'] * 100) / 100;
                        d['Tourism'] = Math.round(d['Tourism'] * 100) / 100;
                        d['Education'] = Math.round(d['Education'] * 100) / 100;
                        d['Others'] = Math.round(d['Others'] * 100) / 100;
                    })
                    this.setState({ purpose: datas })
                })
                .catch(err => console.log(err));
            
            this.postData('/get_all_stay', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
                .then(res => {
                    let avg = Math.round(res.data[0]['avg'] * 100) / 100;
                    this.setState({ avg })
                })
                .catch(err => console.log(err));
            }else {
                if(this.state.selectedCountry === null){
                    this.postData('/get_gender_country',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
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
        
                    this.postData('/get_gender_purpose_country',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
                        .then(res => {
                            let datas = res.data;
                            datas.forEach(function(d){
                                d['Female'] = Math.round(d['Female'] * 100) / 100;
                                d['Male'] = Math.round(d['Male'] * 100) / 100;
                            })
                            this.setState({genPurpose: datas});
                        })
                        .catch(err => console.log(err));
                    
                    
                    this.postData('/get_all_purpose_country', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
                        .then(res => {
                            let datas = res.data;
                            datas.forEach(function(d){
                                d['label'] = d['label'].slice(0,10);
                                d['Business/Commerce'] = Math.round(d['Business/Commerce'] * 100) / 100;
                                d['Tourism'] = Math.round(d['Tourism'] * 100) / 100;
                                d['Education'] = Math.round(d['Education'] * 100) / 100;
                                d['Others'] = Math.round(d['Others'] * 100) / 100;
                            })
                            this.setState({ purpose: datas })
                        })
                        .catch(err => console.log(err));
                    
                    this.postData('/get_all_stay_country', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear, nationality:this.state.selectedCountry})
                        .then(res => {
                            let avg = Math.round(res.data[0]['avg'] * 100) / 100;
                            this.setState({ avg })
                        })
                        .catch(err => console.log(err));
            }
            
        }
    }

    callBackendAPI = async (url) => {
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    }

    postData = async (url,bodyObj) => {
        console.log(bodyObj);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(bodyObj)
        })
        const body = await response.json();
        return body;
    }

    fillCountries = () => {
        const select = document.querySelector('.countries');
        const count = this.state.countries;
        let op = document.createElement("option");
        let text = document.createTextNode("-- All Countries --");
        op.appendChild(text);
        op.selected =true;
        op.disabled = true;
        select.appendChild(op);
        var self =this;
        count.forEach(function(c) {
            op = document.createElement("option");
            text = document.createTextNode(c);
            op.appendChild(text);
            op.value=c;
            op.classList.add("country");
            op.addEventListener('click', self.selectCountry);
            select.appendChild(op);
        })
    }

    selectCountry = () => {
        let select = document.querySelector('.countries');
        let selectedOption = select.options[select.selectedIndex].value;
        this.setState({selectCountry: selectedOption});
    }


    updateFromYears = (month, year) => {
        this.setState({
            fromMonth: month,
            fromYear: year
        });
    }

    updateToYears = (month, year) => {
        this.setState({
            toMonth: month,
            toYear: year
        });
    }

    reRender = () => {
        console.log("in here");
        console.log(this.state.selectedCountry);
        if(this.state.selectedCountry === null){
            this.postData('/get_gender',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
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

            this.postData('/get_gender_purpose',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
                .then(res => {
                    let datas = res.data;
                    datas.forEach(function(d){
                        d['Female'] = Math.round(d['Female'] * 100) / 100;
                        d['Male'] = Math.round(d['Male'] * 100) / 100;
                    })
                    this.setState({genPurpose: datas});
                })
                .catch(err => console.log(err));
            
            
            this.postData('/get_all_purpose', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
                .then(res => {
                    let datas = res.data;
                    datas.forEach(function(d){
                        d['label'] = d['label'].slice(0,10);
                        d['Business/Commerce'] = Math.round(d['Business/Commerce'] * 100) / 100;
                        d['Tourism'] = Math.round(d['Tourism'] * 100) / 100;
                        d['Education'] = Math.round(d['Education'] * 100) / 100;
                        d['Others'] = Math.round(d['Others'] * 100) / 100;
                    })
                    this.setState({ purpose: datas })
                })
                .catch(err => console.log(err));
            
            this.postData('/get_all_stay', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear})
                .then(res => {
                    let avg = Math.round(res.data[0]['avg'] * 100) / 100;
                    this.setState({ avg })
                })
                .catch(err => console.log(err));
            }else {
                    this.postData('/get_gender_country',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
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
        
                    this.postData('/get_gender_purpose_country',{fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
                        .then(res => {
                            let datas = res.data;
                            datas.forEach(function(d){
                                d['Female'] = Math.round(d['Female'] * 100) / 100;
                                d['Male'] = Math.round(d['Male'] * 100) / 100;
                            })
                            this.setState({genPurpose: datas});
                        })
                        .catch(err => console.log(err));
                    
                    
                    this.postData('/get_all_purpose_country', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
                        .then(res => {
                            let datas = res.data;
                            datas.forEach(function(d){
                                d['label'] = d['label'].slice(0,10);
                                d['Business/Commerce'] = Math.round(d['Business/Commerce'] * 100) / 100;
                                d['Tourism'] = Math.round(d['Tourism'] * 100) / 100;
                                d['Education'] = Math.round(d['Education'] * 100) / 100;
                                d['Others'] = Math.round(d['Others'] * 100) / 100;
                            })
                            this.setState({ purpose: datas })
                        })
                        .catch(err => console.log(err));
                    
                    this.postData('/get_all_stay_country', {fromMonth:this.state.fromMonth, fromYear: this.state.fromYear, toMonth:this.state.toMonth,toYear:this.state.toYear,nationality:this.state.selectedCountry})
                        .then(res => {
                            let avg = Math.round(res.data[0]['avg'] * 100) / 100;
                            this.setState({ avg })
                        })
                        .catch(err => console.log(err));            
        }
    }

    resetFilters = () => {
        this.setState({
            fromMonth: 1,
            fromYear: 2008,
            toMonth:8,
            toYear:2018,
            selectedCountry:null
        });
        setTimeout(() => {
            let select = document.querySelector(".countries");
            select.options[0].selected = true;
            this.reRender();
        },100);

    }

    handleBarClick = (e) => {
        if(e !== null){

            if(this.state.purposeSelected === false){
                this.setState({
                    purposeSelected:true,
                    selectedPurpose: e.activeLabel,
                activeIndex: e.activeTooltipIndex
                })
            } else if(this.state.purposeSelected === true && e.activeLabel === this.state.selectedPurpose){
                this.setState({
                    purposeSelected:false,
                    selectedPurpose: null,
                    activeIndex: -1
                })
            } else if(this.state.purposeSelected === true && e.activeLabel !== this.state.selectedPurpose){
                this.setState({
                    selectedPurpose: e.activeLabel,
                    activeIndex: e.activeTooltipIndex
                })
            }
        }
    }

    
    updateCountry = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({selectedCountry: e.target.value})
    }

    render() {  
        let style = {
            transform: "rotateY(180deg)",
            fontFamily: "'Montserrat',sans-serif"
        }

        let lines = null;
        if(this.state.selectedPurpose === null){
            lines = (
                <LineChart width={470} height={190} data={this.state.purpose} className="line">
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="label" className="xaxiss" tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12} date={true}/>}/>
                    <YAxis />
                    <Tooltip labelStyle={{fontFamily: "'Montserrat',sans-serif"}} itemStyle={{fontFamily: "'Montserrat',sans-serif"}}/>
                    <Legend />
                    <Line type="monotone" dataKey="Tourism" stroke="#f39c12" dot={false}/>
                    <Line type="monotone" dataKey="Business/Commerce" stroke="#8884d8" activeDot={{r: 3}} dot={false}/>
                    <Line type="monotone" dataKey="Education" stroke="#8e44ad" dot={false}/>
                    <Line type="monotone" dataKey="Others" stroke="#e74c3c" dot={false}/>
                </LineChart>
            );
        }else if(this.state.selectedPurpose === 'Tourism'){
            lines = (
                <LineChart width={470} height={190} data={this.state.purpose} className="line">
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="label" className="xaxiss" tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12} date={true}/>}/>
                    <YAxis />
                    <Tooltip labelStyle={{fontFamily: "'Montserrat',sans-serif"}} itemStyle={{fontFamily: "'Montserrat',sans-serif"}}/>
                    <Legend />
                    <Line type="monotone" dataKey="Tourism" stroke="#f39c12" dot={false}/>
                </LineChart>
            )
        }else if(this.state.selectedPurpose === 'Business/Commerce'){
            lines = (
                <LineChart width={470} height={190} data={this.state.purpose} className="line">
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="label" className="xaxiss" tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12} date={true}/>}/>
                    <YAxis />
                    <Tooltip labelStyle={{fontFamily: "'Montserrat',sans-serif"}} itemStyle={{fontFamily: "'Montserrat',sans-serif"}}/>
                    <Legend />
                    <Line type="monotone" dataKey="Business/Commerce" stroke="#8884d8" activeDot={{r: 3}} dot={false}/>
                </LineChart>
            )
        }else if(this.state.selectedPurpose === 'Education'){
            lines = (
                <LineChart width={470} height={190} data={this.state.purpose} className="line">
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="label" className="xaxiss" tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12} date={true}/>}/>
                    <YAxis />
                    <Tooltip labelStyle={{fontFamily: "'Montserrat',sans-serif"}} itemStyle={{fontFamily: "'Montserrat',sans-serif"}}/>
                    <Legend />
                    <Line type="monotone" dataKey="Education" stroke="#8e44ad" dot={false}/>
                </LineChart>
            )
        }else if(this.state.selectedPurpose === 'Others'){
            lines = (
                <LineChart width={470} height={190} data={this.state.purpose} className="line">
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="label" className="xaxiss" tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12} date={true}/>}/>
                    <YAxis />
                    <Tooltip labelStyle={{fontFamily: "'Montserrat',sans-serif"}} itemStyle={{fontFamily: "'Montserrat',sans-serif"}}/>
                    <Legend />
                    <Line type="monotone" dataKey="Others" stroke="#e74c3c" dot={false}/>
                </LineChart>
            )
        }

        return (
            <div className="dataviz2">
                <div className="LineChart">
                    <div className="chartheader">
                        <h2 className="headertext">Trend in Purpose of Visit</h2>
                        <h4 className="headerline">View the trend in different purposes of visit.</h4>
                    </div>
                    <div className="linechart">
                        {lines}
                    </div>
                </div>
                <div className="genderchart">
                    <div className="chartheader">
                        <h2 className="headertext">Distribution of Age Group by Gender</h2>
                        <h4 className="headerline">Hover to compare the number of visitors in each category.</h4>
                    </div>
                    <div className="barchart">
                        <BarChart width={180} height={190} data={this.state.gender[0]} className="Female" layout="vertical" syncId="anyId">
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis type="number" tick={<CustomizedAxisTick cname="SVGTEXT" textA={'middle'} dy={12}/>}  className="xaxiss" domain={[0, 3000]}/>
                            <YAxis orientation="left" dataKey="age_group" type="category" hide={true} tick={true} reversed={true}/>
                            <Tooltip labelStyle={style} itemStyle={style}/>
                            <Legend wrapperStyle={{
                                transform: "rotateY(180deg)"
                            }} payload={[{value:"Avg. of Females", type: 'line', id: 'ID01'}]}/>
                            <Bar dataKey="avg" fill="#ee7989" />
                        </BarChart>
                        <BarChart width={250} height={190} data={this.state.gender[1]} className="Male" layout="vertical" syncId="anyId">
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis type="number" className="xaxiss" domain={[0, 3000]} tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12}/>}/>
                            <YAxis dataKey="age_group" type="category" reversed={true} tick={<CustomizedAxisTick cname="normaltext" textA={'end'} dy={5}/>}/>
                            <Tooltip />
                            <Legend payload={[{value:"Avg. of Males", type: 'line', id: 'ID01'}]}/>
                            <Bar dataKey="avg" fill="#4682b4" />
                        </BarChart>
                    </div>
                </div>
                <div className="genderpurpose">
                    <div className="chartheader">
                        <h2 className="headertext">Distribution of Purpose by Gender</h2>
                        <h4 className="headerline">Click a Purpose to see the specific trend in the above chart.</h4>
                    </div>
                    <div className="barchart">
                        <BarChart width={470} height={190} data={this.state.genPurpose}
                                    margin={{top: 5, right: 30, left: 20, bottom: 5}} onClick={this.handleBarClick}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="purpose" className="xaxiss" tick={<CustomizedAxisTick cname="normaltext" textA={'middle'} dy={12}/>}/>
                            <YAxis/>
                            <Tooltip labelStyle={{fontFamily: "'Montserrat',sans-serif"}} itemStyle={{fontFamily: "'Montserrat',sans-serif"}}/>
                            <Legend />
                            <Bar dataKey="Female" fill="#ee7989">
                                {
                                    this.state.genPurpose !== null ?
                                    this.state.genPurpose.map((entry, index) => (
                                        <Cell cursor="pointer" fill="#ee7989" stroke={index === this.state.activeIndex ? "#000" : null} key={`cell-${index}`} strokeWidth={index === this.state.activeIndex ? 2 : 1}/>
                                    )) : null
                                }
                            </Bar>
                            <Bar dataKey="Male" fill="#4682b4">
                            {
                                this.state.genPurpose !== null ?
                                this.state.genPurpose.map((entry, index) => (
                                    <Cell cursor="pointer" fill="#4682b4" stroke={index === this.state.activeIndex ? "#000" : null} key={`cell-${index}`} strokeWidth={index === this.state.activeIndex ? 2 : 1}/>
                                    )) : null
                                }
                            </Bar>
                        </BarChart>
                    </div>
                </div>
                <div className="filter">
                    <div className="filters">
                        <div className="myfilter countryDiv">
                            <span className="filterheader">Country:</span>
                            <div className="country-select filterselect">
                                    <select className="countries" onChange={this.updateCountry}></select>
                            </div>
                        </div>
                        <div className="myfilter fromDiv">
                            <span className="filterheader">From:</span>
                            <MonthPicker minYear={2008} minMonth={1} maxMonth={8} maxYear={2018} selectedDropdownYear={this.state.fromYear} selectedMonth={this.state.fromMonth} onSelect={this.updateFromYears} className="filterselect"/>
                        </div>
                        <div className="myfilter toDiv">
                            <span className="filterheader">To:</span>
                            <MonthPicker minYear={this.state.fromYear ? this.state.fromYear : 2008} minMonth={this.state.fromMonth ? this.state.fromMonth + 1 : 1} maxMonth={8} maxYear={2018} selectedDropdownYear={this.state.toYear} selectedMonth={this.state.toMonth} onSelect={this.updateToYears} className="filterselect" />
                        </div>

                        <div className="submitfilters" onClick={this.reRender}>Filter Data</div>
                        <div className="resetfilters" onClick={this.resetFilters}>Reset Filter</div>

                    </div>
                    <Stay avg={this.state.avg}/>
                </div>
            </div>
        );
        
    }  
}  
  
  
export default DataViz2;