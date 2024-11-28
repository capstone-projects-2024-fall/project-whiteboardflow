import React from 'react';
import './css/question-display.css';

const QuestionDisplay = ({darkMode}) => {
    const question = getQuestionFromStorage();

    // If question is not available, show an empty div or a message
    if (!question) {
        return <div></div>;
    } else {
        sessionStorage.setItem("question_text", question.question_text);
    }

    return (
        <div className={darkMode ? "question-container-dark" : "question-container-light"}>
            {console.log("Question Display " + darkMode)}
            {/* Render Question Text */}
            {question.question_text && (
                <div className={darkMode ? "question-dark" : "question-light"}><strong>Question:</strong> {question.question_text}</div>
            )}
            {/* Render Explanation*/}
            {question.explanation && (
                <div><strong>Explanation:</strong> {question.explanation}</div>
            )}
            {/* Render Examples */}
            {question.examples && question.examples.length > 0 && (
                <>
                    <hr />
                    <div>
                        {question.examples.map((example, index) => (
                            <div key={index} className="example">
                                <div className={darkMode ? "example-title-dark" : "example-title-light"}>Example {index + 1}:</div>
                                <div className={darkMode ? "example-content-dark" : "example-content-light"}>
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
                    </div>
                </>
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