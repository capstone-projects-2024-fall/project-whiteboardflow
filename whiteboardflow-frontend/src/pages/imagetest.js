import React, { useEffect } from 'react';

/**
 * ${1:Description placeholder}
 *
 * @returns {${2:*}}
 */
const RedirectToImage = () => {
    useEffect(() => {
        // Redirect to the specified URL after component mounts
        window.location.href = "http://127.0.0.1:8000/images/image.png";
    }, []);

    return (
        <div>
            <p>Redirecting you to the image...</p>
        </div>
    );
};

export default RedirectToImage;
