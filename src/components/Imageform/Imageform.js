import React from "react";
import './Imageform.css';
const Imageform = ({ onInputChange, onButtonClick }) => {
    return (
        <div>
            <p className="f3">
                {"Welcome to image recognition smart brain, it will detect the face."}
            </p>
            <div className="center form pa4 br3 shadow-2">
                <div className="center">
                    <input className="f4 pa2 w-70 center" type={'tex'} onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonClick}>Detect</button>
                </div>
            </div>

        </div>
    );
}
export default Imageform;