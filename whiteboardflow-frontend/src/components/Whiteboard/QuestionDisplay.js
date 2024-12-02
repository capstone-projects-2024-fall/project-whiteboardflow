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

const QuestionDisplay = () => {
    const question = getQuestionFromStorage();

    // If question is not available, show an empty div or a message
    if (!question) {
        return <div></div>;
    } else {
        sessionStorage.setItem("question_text", question.question_text);
    }

    return (
        <div className="question-container">
            {/* Render Question Text */}
            {question.question_text && (
                <div className="question">
                    <strong>Question: </strong>
                    <ReactMarkdownSpan text={question.question_text} />
                </div>
            )}
            {/* Render Explanation*/}
            {question.explanation && (
                <div>
                    <strong>Explanation: </strong>
                    <ReactMarkdownSpan text={question.explanation} />
                </div>
            )}
            {/* Render Function Definition*/}
            {question.function && (
                <div><strong>Function:</strong> <code>{question.function}</code></div>
            )}
            {/* Render Examples */}
            {question.examples && question.examples.length > 0 && (
                <>
                    <hr />
                    <div>
                        {question.examples.map((example, index) => (
                            <div key={index} className="example">
                                <div className="example-title">Example {index + 1}:</div>
                                <div className="example-content">
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