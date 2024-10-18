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
        console.log('Server configuration fetched successfully.');

        const options = {
          configuration: {
            offscreen: true,
            server,
            rendering: {
              minHeight: 2000,
              minWidth: 2000,
            },
            modules: {
              eraser: true,
              transcript: true,
            },
          },
        };

        editor = new window.iink.Editor(editorElementRef.current, options);
        console.log('iink Editor initialized successfully.');
        console.log(editor);
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
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
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
export default Whiteboard;
