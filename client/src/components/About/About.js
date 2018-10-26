import React, {Component} from 'react';
import './About.css'

class About extends Component{
    render(){
        return (
            <section className="About">
                <h2 className="teamheader">Meet the <b>Team</b></h2>
                <div className="team">
                    <div className="member">
                        <div className="image color1">
                            <img src={require('./huiyeonround.png')} alt="" className="member-image"/>
                        </div>
                        <div className="role c1">
                            <h3 className="name">Kim Huiyeon</h3>
                            <h4 className="name r">Software Developer</h4>
                        </div>
                        <p className="description">Penultimate Student in Singapore Management University, pursuing Bs. in Information Systems with Analytics as 2nd major. Aspires to be a Professional Software Developer in the future.</p>
                    </div>
                    <div className="member">
                        <div className="image color2">
                            <img src={require('./hannahround.png')} alt="" className="member-image"/>
                        </div>
                        <div className="role c2">
                            <h3 className="name">Lee Hyeonjeong</h3>
                            <h4 className="name r">Project Manager</h4>
                        </div>
                        <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                    </div>
                    <div className="member">
                        <div className="image color3">
                            <img src={require('./doyeonround.png')} alt="" className="member-image"/>
                        </div>
                        <div className="role c3">
                            <h3 className="name">Kim Doyeon</h3>
                            <h4 className="name r">Data Analyst</h4>
                        </div>
                        <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;