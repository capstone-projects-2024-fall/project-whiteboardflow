import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Helper({ message }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                <div className="helper-bubble">{message}</div>
            </motion.div>
        </div>
    );
}

export default Helper;
