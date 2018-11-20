import React, {Component} from 'react';
import './CustomizedAxisTick.css'



class CustomizedAxisTick extends Component {
    render () {
        const {x, y, payload, cname, textA,dy,date } = this.props;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(!date){
            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={dy} textAnchor={textA} fill="#666" className={cname}>{payload.value}</text>
                </g>
            );
        }else{
            let year = payload.value.slice(0,4);
            let month = parseInt(payload.value.slice(5,7));
            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={dy} textAnchor={textA} fill="#666" className={cname}>{`${months[month - 1]}-${year}`}</text>
                </g>
            );
        }
    }
}


export default CustomizedAxisTick;