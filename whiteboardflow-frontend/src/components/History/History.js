import { useEffect, useState, useMemo } from 'react';
import DataTable from "../DataTable/DataTable";
import { createData } from '../DataTable/DataTable';
import { getAllHistory } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './History.css';
import { useQuestionContext } from '../QuestionSelect/QuestionContext';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const { questions } = useQuestionContext();

  const rowKeys = useMemo(() => ['id', 'title', 'question', 'category', 'difficulty', 'date', 'session_id'], []);

  const headers = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Question' },
    { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'difficulty', numeric: false, disablePadding: false, label: 'Difficulty' }
  ];

  useEffect(() => {
    getAllHistory().then(setHistory);
  }, []);

  const rows = useMemo(() => {
    if (!history || !questions) return [];
    return history.map((historyItem, index) => {
      const question = questions.find((q) => q.id === historyItem.questionId);

      const formattedCategories = question.categories
        ? question.categories.join(', ')
        : '';

      const rawDate = parseInt(historyItem.sessionId);
      const displayDate = new Date(rawDate).toLocaleString();

      return createData(
        rowKeys,
        index + 1, // Start index at 1 so 1st entry is /history/1
        question.title,
        question.id,
        formattedCategories,
        question.difficulty,
        displayDate,
        rawDate,
      );
    });
  }, [history, questions, rowKeys]);

  // Empty string for Fermi questions
  const difficultyOrder = { Basic: 1, Intermediate: 2, Advanced: 3, "": 4 };

  const customComparators = {
    difficulty: (a, b) => {
      const aValue = difficultyOrder[a.difficulty] || 4;
      const bValue = difficultyOrder[b.difficulty] || 4;
      return bValue - aValue;
    },
    date: (a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    },
  };

  function renderCellContent(key, value) {
    return value;
  }

  const handleEntryOpen = (row) => {
    navigate(`/history/${row.id}`, {
      state: {
        rowData: row,
      }
    });
  };

  if (!rows) return null;

  return (
    <div>
      <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>Previously answered questions:</h1>
      {rows && (
        <DataTable
          headers={headers}
          data={rows}
          onRowSelect={(row) => handleEntryOpen(row)}
          customComparators={customComparators}
          renderCellContent={renderCellContent}
        />
      )}
    </div>
  );
};

export default History;
