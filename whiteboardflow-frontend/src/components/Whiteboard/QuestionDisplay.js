import React from 'react';
import './css/question-display.css';
import ReactMarkdown from 'react-markdown';

/**
 * The ReactMarkdown component turns into a `<p>`, which produces a new line. 
 * This component replaces `<p>` with `<span>` to avoid this.
 */
export const ReactMarkdownSpan = ({ text }) => {
    if (!text) return null;

    return (
        <ReactMarkdown
            components={{
                p: ({ node, ...props }) => <span {...props} />,
            }}
        >
            {text}
        </ReactMarkdown>
    );
};

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
                <div className={darkMode ? "explanation-dark" : "explanation-light"}><strong>Explanation:</strong> {question.explanation}</div>
            )}
            {/* Render Function Definition*/}
            {question.function && (
                <div className={darkMode ? "function-dark" : "function-light"}><strong>Function:</strong> <code>{question.function}</code></div>

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
                                        <div><strong>Input:</strong> <code>{example.input}</code></div>
                                    )}
                                    {example.output && (
                                        <div><strong>Output:</strong> <code>{example.output}</code></div>
                                    )}
                                    {example.explanation && (
                                        <div>
                                            <strong>Explanation: </strong>
                                            <ReactMarkdown>{example.explanation}</ReactMarkdown>
                                        </div>
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