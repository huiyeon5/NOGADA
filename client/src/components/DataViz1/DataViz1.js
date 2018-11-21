import React, { Component } from 'react';  
import tableau from 'tableau-api';
import './DataViz1.css';
  
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
        const vizUrl = 'https://public.tableau.com/views/VAProject181118j/Story1?:embed=y&:display_count=yes&publish=yes';  
        const vizContainer = this.vizContainer;  
        let viz = new window.tableau.Viz(vizContainer, vizUrl);
        this.setState({viz});
    }  
  
  
    render() {  
        return (  
            <div className="tableauu">
                <div className="Tab" ref={(div) => { this.vizContainer = div }}></div>  
            </div>
        );  
    }  
}  
  
  
export default DataViz1;