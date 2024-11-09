import React, { useState } from 'react';
import './css/helpbutton.css'; // Ensure the CSS file is imported here

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Snackbar, Alert } from '@mui/material';
import { getIdToken } from '../../firebase';
import ReactMarkdown from 'react-markdown';

const HintButton = ({ sendPNGToFirebase }) => {
	const [open, setOpen] = useState(false);
	const [hintUsed, setHintUsed] = useState(false);
	const [hintResponse, setHintResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleOpen = async () => {
		setOpen(true);

		if (hintUsed) {
			setSnackbarOpen(true);
			return;
		}

		setHintUsed(true);
		setLoading(true);

		try {
			await sendPNGToFirebase(false);
			const response = await getHintResponse();
			setHintResponse(response);
		} catch (error) {
			console.error("Error during image upload or hint response:", error);
		} finally {
			setLoading(false);
		}
	}

	const getHintResponse = async () => {
		const idToken = await getIdToken();

		try {
			const response = await fetch("/api/get-hint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: idToken,
					question: localStorage.getItem("question"),
					image: ""
				})
			});

			// Get ChatGPT response
			const result = await response.json();
			return result.message;

		} catch (error) {
			console.error("Error:", error);
		}
	}

	const handleClose = () => setOpen(false);
	const handleSnackbarClose = () => setSnackbarOpen(false);


	return (
		<>
			<button className='help-button' type="button" onClick={handleOpen}>
				Request a Hint
			</button>
			{/* Snackbar for hint already used */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity="warning">
					You have already used a hint for this session.
				</Alert>
			</Snackbar>
			<Modal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={open}
				onClose={handleClose}
				slots={{ backdrop: StyledBackdrop }}
			>
				<div style={{ position: 'relative', width: 700, maxHeight: '500px' }}>
					<button
						onClick={handleClose}
						style={{
							position: 'absolute',
							top: 10,
							right: 10,
							background: 'transparent',
							border: 'none',
							fontSize: '1.5rem',
							cursor: 'pointer',
							zIndex: 1 // Ensure it stays above the ModalContent
						}}
					>
						&times;
					</button>
					<ModalContent sx={{ width: '100%', maxHeight: '500px', overflowY: 'auto' }}>
						<h2 id="unstyled-modal-title" className="modal-title">
							Hint Response
						</h2>
						{loading ? (
							<div className="loader"></div> // Show loader when loading
						) : (
							<p id="unstyled-modal-description" className="modal-description">
								<ReactMarkdown>{hintResponse}</ReactMarkdown>
							</p>
						)}
					</ModalContent>
				</div>
			</Modal>
		</>
	);
};

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

const blue = {
	200: '#99CCFF',
	300: '#66B2FF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	700: '#0066CC',
};

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

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

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


export default HintButton;
