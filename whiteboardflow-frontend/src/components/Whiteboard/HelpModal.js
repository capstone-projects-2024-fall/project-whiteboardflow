import React from 'react';

const HelpModal = ({ isVisible, onClose }) => {
    return (
        <div id="help-modal" className="help-modal" style={{ display: isVisible ? 'block' : 'none' }}>
            <div id="help-modal-content" className="help-modal-content">
                <button className="close" onClick={onClose}>×</button>
                <h1>Gestures</h1>
                <div className="gestures">
                    <h3>Erase</h3>
                    <p>Scratch thoroughly and cover all the characters.</p>
                    <div className="gestures-img-container">
                        <img src="img/gestures/gest-erase.png" alt="Erase gesture"/>
                    </div>
                </div>
                <div className="gestures">
                    <h3>Break</h3>
                    <p>Draw a straight vertical line downwards. Start above characters and end well below the baseline.</p>
                    <div className="gestures-img-container">
                        <img src="img/gestures/gest-break-lines.png" alt="Break lines gesture"/>
                        <img src="img/gestures/gest-break-words.png" alt="Break words gesture"/>
                    </div>
                </div>
                <div className="gestures">
                    <h3>Join</h3>
                    <p>Draw a straight vertical line upwards. Start well below the baseline and end above characters.</p>
                    <div className="gestures-img-container">
                        <img src="img/gestures/gest-join-lines.png" alt="Join lines gesture"/>
                        <img src="img/gestures/gest-join-words.png" alt="Join words gesture"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
