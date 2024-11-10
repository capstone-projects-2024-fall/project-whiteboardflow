import React from 'react';
import './css/helpbutton.css'; // Ensure the CSS file is imported here

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal} from '@mui/base/Modal';



    /**
 * ${1:Description placeholder}
 *
 * @returns {${2:*}}
 */
const HelpButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <button className='help-button' type="button" onClick={handleOpen}>
        Help
      </button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 700 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            Help:
          </h2>
          <p id="unstyled-modal-description" className="modal-description">
          WhiteBoardFlow is a web application designed to help job seekers prepare for interviews by allowing users to solve coding and estimation problems on a digital whiteboard using a tablet and stylus. It includes microphone integration for speech detection, enabling users to verbalize their thought process while answering questions. The app leverages AI to provide feedback and assistance based on the user's progress and logs their performance history for ongoing study and improvement.
          <br/><br/>
          To begin, click the "Start" button on the home page. You will then be brought to the whiteboard where you will be prompted to answer a coding or Fermi approximation question. Affter submitting you will be taken to the verbal page where you explain your answer. You will then submit and recieve feedback.
          </p>
        </ModalContent>
      </Modal>
      </>
    );
};

/**
 * ${1:Description placeholder}
 *
 * @type {${2:*}}
 */
const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'base-Backdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    );
  });
  
  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };
  
  /**
 * ${1:Description placeholder}
 *
 * @type {{ 200: string; 300: string; 400: string; 500: string; 600: string; 700: string; }\}
 */
const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  
  /**
 * ${1:Description placeholder}
 *
 * @type {{ 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string; 700: string; 800: string; 900: string; }\}
 */
const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  /**
 * ${1:Description placeholder}
 *
 * @type {${2:*}}
 */
const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  /**
 * ${1:Description placeholder}
 *
 * @type {${2:*}}
 */
const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  /**
 * ${1:Description placeholder}
 *
 * @type {${2:*}}
 */
const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
  );
  

export default HelpButton;
