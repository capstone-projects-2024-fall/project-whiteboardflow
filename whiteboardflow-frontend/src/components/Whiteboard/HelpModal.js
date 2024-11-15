import React from 'react'; // Ensure to import useState

const HelpModal = ({ isVisible, onClose }) => {
    // const [open, setOpen] = useState(false); // State to manage visibility internally if needed

    // Enhanced style object
    const modalStyle = {
        display: isVisible ? 'block' : 'none',
        zIndex: 2000,
    };

    return (
        <div id="help-modal" className="help-modal" style={modalStyle}>
            <div id="help-modal-content" className="help-modal-content">
                <button className="close" onClick={onClose}>×</button>
                <h1>Hi!</h1>
                <div className="gestures">
                    <h3>What is it?</h3>
                    <p>WhiteBoardFlow is a web application designed to help job seekers prepare for interviews by allowing users to solve coding and estimation problems on a digital whiteboard using a tablet and stylus. It includes microphone integration for speech detection, enabling users to verbalize their thought process while answering questions. The app leverages AI to provide feedback and assistance based on the user's progress and logs their performance history for ongoing study and improvement.</p>
                    <div className="gestures-img-container">
                        <img src="logo192.png" alt="logo"/>
                    </div>
                </div>
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
