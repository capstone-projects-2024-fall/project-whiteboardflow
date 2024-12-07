import React from 'react';
import DataTable from "../DataTable/DataTable";
import { createData } from '../DataTable/DataTable';
import { getAllHistory, getAllQuestions } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const [rows, setRows] = React.useState(null);
  const navigate = useNavigate();

  const rowKeys = ['id', 'title', 'question', 'category', 'difficulty', 'date', 'session_id'];

  const headers = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Question' },
    { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'difficulty', numeric: false, disablePadding: false, label: 'Difficulty' }
  ];

  React.useEffect(() => {
    getAllHistory().then((history) => {
      getAllQuestions().then((questions => {
        const newRows = history.map((history, index) => {
          const question = questions.find(q => q.id === history.questionId)

          const formattedCategories = question.categories
            ? question.categories.join(', ')
            : '';

          const day = new Date(parseInt(history.sessionId)).toLocaleString()

          return createData(
            rowKeys,
            index,
            question.title,
            question.id,
            formattedCategories,
            question.difficulty,
            day,
            history.sessionId
          );
        })
        setRows(newRows)
      }))
    })
  }, [])

  function renderCellContent(key, value) {
    return value;
  }

  const handleEntryOpen = (id) => {
    console.log(id);
  };

  if (!rows) return null;

  return (
    <div>
      <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>Previously answered questions:</h1>
      {rows && (
        <DataTable
          headers={headers}
          data={rows}
          onRowSelect={(id) => handleEntryOpen(id)}
          renderCellContent={renderCellContent}
        />
      )}
    </div>
  );
};

export default History;
