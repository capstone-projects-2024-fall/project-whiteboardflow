// WhiteboardContext.js
import React, { createContext, useContext, useRef, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const WhiteboardContext = createContext();

export const useWhiteboard = () => {
  return useContext(WhiteboardContext);
};

export const WhiteboardProvider = ({ children }) => {
  const editor = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const sendPNGToFirebase = async (i = false, path) => {
    return new Promise((resolve, reject) => {
      const behaviors = editor.current.behaviors;
      const symbols = i ? behaviors.model.symbolsSelected : behaviors.model.symbols;
      const bounds = behaviors.getSymbolsBounds(symbols);
      const svgBlob = behaviors.buildBlobFromSymbols(symbols, bounds);
      const svgUrl = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF'; // Set the background color to white
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(svgUrl); // Clean up the SVG blob URL

        // Convert the canvas to PNG
        canvas.toBlob(async (pngBlob) => {
          const storage = getStorage();
          const storageRef = ref(storage, path);

          try {
            const snapshot = await uploadBytes(storageRef, pngBlob);
            console.log("Image uploaded to Firebase successfully.");

            const downloadURL = await getDownloadURL(snapshot.ref);
            resolve(downloadURL); // Resolve with the download URL
          } catch (error) {
            console.error("Error uploading image to Firebase:", error);
            reject(error); // Reject in case of an error
          }
        }, 'image/png');
      };
      img.onerror = (error) => {
        reject(error); // Reject if there’s an image load error
      };
      img.src = svgUrl;
    });
  };

  return (
    <WhiteboardContext.Provider value={{ editor, sendPNGToFirebase, isLoaded, setIsLoaded }}>
      {children}
    </WhiteboardContext.Provider>
  );
};
