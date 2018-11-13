import React, { Component } from 'react';  
// import tableau from 'tableau-api';
  
class DataViz1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            viz:null
        };
    }
    
    componentDidMount() {  
        if(!this.state.viz){
            this.initViz()  
        }
    }  
  
  
    initViz() {  
        const vizUrl = 'https://public.tableau.com/views/Seasonality_VAproject_draft5/DASHBOARDONE?:embed=y&:display_count=yes&publish=yes';  
        const vizContainer = this.vizContainer;  
        let viz = new window.tableau.Viz(vizContainer, vizUrl);
        this.setState({viz});
    }  
  
  
    render() {  
        return (  
            <div className="Tab" ref={(div) => { this.vizContainer = div }}></div>  
        );  
    }  
}  
  
  
export default DataViz1;