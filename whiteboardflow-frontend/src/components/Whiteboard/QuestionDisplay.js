import React from 'react';
import './css/question-display.css';

const QuestionDisplay = ({ question }) => {
    // If question is not available, show an empty div or a message
    if (!question) {
        return <div></div>;
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

// Helper function to retrieve question from sessionStorage
export const getQuestionFromStorage = () => {
    const savedQuestion = sessionStorage.getItem('question');
    return savedQuestion ? JSON.parse(savedQuestion) : null;
};

// Helper function to save question to sessionStorage
export const saveQuestionToStorage = (question) => {
    if (question) {
        sessionStorage.setItem('question', JSON.stringify(question));
    }
};

export default QuestionDisplay;