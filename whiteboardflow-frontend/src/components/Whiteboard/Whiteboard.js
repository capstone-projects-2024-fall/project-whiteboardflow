import React, { useEffect, useRef } from 'react';
import HelpButton from './HelpButton';
import './css/reset.css';
import './css/components.css';
import './css/examples.css';

const Whiteboard = () => {
  const editorElementRef = useRef(null);

  useEffect(() => {
    console.log("Whiteboard mounted");
    let editor;
    const handleResize = () => {
      if (editor) {
        editor.resize();
      }
    };

    const loadEditor = async () => {
      try {
        console.log('Fetching server configuration...');
        const response = await fetch("server-configuration.json");
        const server = await response.json();
        console.log('Server configuration:', server);

        const options = {
          configuration: {
            offscreen: true,
            server,
            rendering: {
              minWidth: 2000,
              maxHeight: 2000,
            },
            modules: {
              eraser: true,
              transcript: true,
            },
          },
        };

        editor = new window.iink.Editor(editorElementRef.current, options);
        console.log('iink Editor initialized successfully.');
        console.log('Editor configuration:', editor.configuration);

        await editor.initialize();
        window.addEventListener("resize", handleResize);
      } catch (error) {
        console.error("Error during iink Editor initialization:", error);
      }
    };

    loadEditor();

    return () => {
      console.log("Whiteboard unmounting");
      window.removeEventListener("resize", handleResize);
      if (editor) {
        try {
          editor.destroy();
          console.log('iink Editor destroyed successfully.');
        } catch (cleanupError) {
          console.error('Failed to destroy iink Editor:', cleanupError);
        }
      }
    };
  },
      );

  return (
      <div style={{ width: '100%', height: '90vh', position: 'relative' }}>
        <div
            id="editor"
            ref={editorElementRef}
            style={{
              width: '100%',
              height: '100%',
              touchAction: 'none',
            }}
        />
        <HelpButton /> {/* Using the HelpButton component */}
      </div>
  );

};
//<button id="ms-menu-action-export" class="ms-menu-button square"><svg width="24px" height="24px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
//   <path d="M6 20L18 20" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// </button>
//<div class="ms-menu ms-menu-bottom ms-menu-row" style="visibility: visible;"><button id="ms-menu-intention-write-pencil" class="ms-menu-button square ms-tooltip active"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">Write</span></button><button id="ms-menu-intention-move" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M7 10.5L4.99591 13.1721C4.41845 13.9421 4.47127 15.0141 5.1216 15.7236L8.9055 19.8515C9.28432 20.2647 9.81826 20.5 10.3789 20.5C11.4651 20.5 13.2415 20.5 15 20.5C17.4 20.5 19 19 19 16.5C19 16.5 19 16.5 19 16.5C19 16.5 19 9.64287 19 7.92859" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M16 8.49995C16 8.49995 16 8.37483 16 7.92852C16 5.6428 19 5.6428 19 7.92852" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M13 8.50008C13 8.50008 13 7.91978 13 7.02715M13 6.50008C13 6.50008 13 6.804 13 7.02715M16 8.50008C16 8.50008 16 8.37496 16 7.92865C16 7.70549 16 7.25031 16 7.02715C16 4.74144 13 4.74144 13 7.02715" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M13 8.50008C13 8.50008 13 7.91978 13 7.02715C13 4.74144 16 4.74144 16 7.02715C16 7.25031 16 7.70549 16 7.92865C16 8.37496 16 8.50008 16 8.50008" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M10 8.50005C10 8.50005 10 7.85719 10 6.50005C10 4.21434 13 4.21434 13 6.50005C13 6.50005 13 6.50005 13 6.50005C13 6.50005 13 6.80397 13 7.02713C13 7.91975 13 8.50005 13 8.50005" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M7 13.5001V6.50006C7 5.67164 7.67157 5.00006 8.5 5.00006V5.00006C9.32843 5.00006 10 5.55527 10 6.38369C10 6.42151 10 6.4603 10 6.50006C10 7.85721 10 8.50006 10 8.50006" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">Move</span></button><button id="ms-menu-intention-select" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M4.9984 2H2V4.9984H4.9984V2Z" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M4.99854 3.50098H18.9987" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M3.5 4.99854V19.0005" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M20.4978 5V19.002" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M4.99854 20.501H18.9987" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M4.9984 19H2V21.9984H4.9984V19Z" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M21.9974 2.00195H18.999V5.00035H21.9974V2.00195Z" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M21.9974 19.002H18.999V22.0004H21.9974V19.002Z" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9966 15.002L7.99658 8.00195L14.9966 11.002L11.9986 12.0009L10.9966 15.002Z" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path fill-rule="evenodd" clip-rule="evenodd" d="M11.999 12.002L14.997 15.002L11.999 12.002Z" stroke="currentColor" stroke-width="1" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">Select</span></button><button id="ms-menu-intention-erase" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M21 21L9 21" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M15.889 14.8891L8.46436 7.46448" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M2.8934 12.6066L12.0858 3.41421C12.8668 2.63317 14.1332 2.63317 14.9142 3.41421L19.864 8.36396C20.645 9.14501 20.645 10.4113 19.864 11.1924L10.6213 20.435C10.2596 20.7968 9.76894 21 9.25736 21C8.74577 21 8.25514 20.7968 7.8934 20.435L2.8934 15.435C2.11235 14.654 2.11235 13.3877 2.8934 12.6066Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">Erase</span></button><div class="sub-menu"><button id="ms-menu-intention-write-edge" class="ms-menu-button square"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M3 20L21 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// </button><div class="sub-menu-content top"><div id="ms-menu-intention-write-edge-list" class="ms-menu-row sub-menu-content-edge"><button id="ms-menu-intention-write-edge-line" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M3 20L21 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">line</span></button><button id="ms-menu-intention-write-edge-arrow" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M3 20L21 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M15 5L21 4L 20 10" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">arrow</span></button><button id="ms-menu-intention-write-edge-double-arrow" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M3 20L21 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M9 19L3 20L 4 14" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
//   <path d="M15 5L21 4L 20 10" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">double-arrow</span></button></div></div></div><div class="sub-menu"><button id="ms-menu-intention-write-shape" class="ms-menu-button square"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M 21 5 V 17.986 C 21 19 21 19 20 19 H 4 C 3 19 3 19 3.015 17.986 V 5 C 3 4 3 4 4 4 H 20.4 C 21 4 21 4 21 5 Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// </button><div class="sub-menu-content top"><div id="ms-menu-intention-write-shape-list" class="ms-menu-row sub-menu-content-shape"><button id="ms-menu-intention-write-shape-rectangle" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M 21 5 V 17.986 C 21 19 21 19 20 19 H 4 C 3 19 3 19 3.015 17.986 V 5 C 3 4 3 4 4 4 H 20.4 C 21 4 21 4 21 5 Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">rectangle</span></button><button id="ms-menu-intention-write-shape-circle" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">circle</span></button><button id="ms-menu-intention-write-shape-ellipse" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M 12 19 C 18 19 22 17 22 12 C 22 7 18 5 12 5 C 6 5 2 7 2 12 C 2 17 6 19 12 19 Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">ellipse</span></button><button id="ms-menu-intention-write-shape-triangle" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M11.4752 2.94682C11.7037 2.53464 12.2963 2.53464 12.5248 2.94682L21.8985 19.8591C22.1202 20.259 21.831 20.75 21.3738 20.75H2.62625C2.16902 20.75 1.87981 20.259 2.10146 19.8591L11.4752 2.94682Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">triangle</span></button><button id="ms-menu-intention-write-shape-rhombus" class="ms-menu-button square ms-tooltip"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
//   <path d="M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>
// <span class="ms-tooltip-content top">rhombus</span></button></div></div></div></div>
export default Whiteboard;
