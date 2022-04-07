import React from "react";
import Tilt from 'react-tilt'
import brain from './brain.png';
import './Logo.css';
const Logo = () =>{
    return(
    <div className="ma4 mt0">
        <Tilt className="Tilt br1 shadow-2" options={{ max : 30 }} style={{ height: 125, width: 125 }} >
        <div className="Tilt-inner pa3 "> <img style={{paddingTop:'3px'}} alt="Logo" src={brain} /> </div>
        </Tilt>
    </div>
    );
}
export default Logo;