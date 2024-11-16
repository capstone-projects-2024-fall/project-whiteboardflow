import React from 'react';
import './css/question-display.css';

const QuestionDisplay = ({ question }) => {
    if (!question) {
        return <div />;
    }

    return (
        <div class="question-container">
            {/* Render Question Text */}
            {question.question_text && (
                <div class="question">Question: {question.question_text}</div>
            )}
            {/* Render Explanation*/}
            {question.explanation && (
                <div><strong>Explanation:</strong> {question.explanation}</div>
            )}
            {/* Render Examples */}
            {question.examples && question.examples.length > 0 && (
                <p>
                    {question.examples.map((example, index) => (
                        <div key={index} class="example">
                            <div class="example-title">Example {index + 1}:</div>
                            <div class="example-content">
                                {example.input && (
                                    <div><strong>Input:</strong> {example.input}</div>
                                )}
                                {example.output && (
                                    <div><strong>Output:</strong> {example.output}</div>
                                )}
                                {example.explanation && (
                                    <div><strong>Explanation:</strong> {example.explanation}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </p>
            )}
        </div>
    );
};


export default QuestionDisplay;