import React, { createContext, useState, useEffect, useContext } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions/all");
        const { question_list } = await response.json();
        setQuestions(question_list);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!questions) {
      fetchQuestions();
    }
  }, [questions]);

  return (
    <QuestionContext.Provider value={{ questions, loading }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);
