import React from 'react';
import {Resizable} from 're-resizable';
import {Typography, Box} from '@mui/material';
import HelpButton from './HelpButton';

// QuestionArea component accepts props for visibility and resize handling
const QuestionArea = ({isVisible, onResizeStop}) => {
    return (
        <Resizable
            defaultSize={{
                width: isVisible ? '30%' : '0px', // Use a minimal width when not visible
                height: '100%' // Full height
            }}
            minWidth={10} // Set to minimal width to keep the drag handle accessible
            maxWidth="80%" // Maximum width to which it can expand
            enable={{right: true}}
            onResizeStop={onResizeStop}
            handleStyles={{
                right: {
                    width: '20px',  // Handle width
                    background: 'rgba(0, 123, 255, 0.8)',
                    cursor: 'ew-resize'
                }
            }}
            handleComponent={{
                right: <div style={{width: '20px', cursor: 'ew-resize'}}></div>
            }}
        >
            {isVisible && (
                <Box sx={{padding: '20px', height: '100%', overflowY: 'auto'}}>

                    <p><strong>Question:</strong> Write a function that takes a list of numbers and returns the sum of
                        all even numbers in the list.</p>
                    <p><strong>Function Signature:</strong></p>
                    <pre>
        <code>
          {`def sum_of_evens(numbers: list) -> int:`}
            <br/>
            {'    pass'}
        </code>
      </pre>
                    <p><strong>Example:</strong></p>
                    <pre>
        <code>
          {`# Input`}
            <br/>
            {`numbers = [1, 2, 3, 4, 5, 6]`}
            <br/>
          <br/>
            {`# Output`}
            <br/>
            {`12`}
        </code>
      </pre>
                    <p><strong>Explanation:</strong> In the list <code>[1, 2, 3, 4, 5, 6]</code>, the even numbers are
                        2, 4, and 6. Their sum is 12.</p>
                    <p><strong>Hints:</strong></p>
                    <ol>
                        <li>Use a loop or list comprehension to filter for even numbers.</li>
                        <li>The modulo operator <code>%</code> can help determine if a number is even.</li>
                    </ol>
                    <HelpButton/>
                </Box>
            )}
        </Resizable>
    );
};

export default QuestionArea;
