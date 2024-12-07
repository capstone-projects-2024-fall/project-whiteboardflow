import React from 'react';
import DataTable from "../DataTable/DataTable";
import { Box, Button, Checkbox, Modal, Typography } from '@mui/material';
import { createData } from '../DataTable/DataTable';
import { getAllHistory } from '../../firebase';
import { ReactMarkdownSpan } from '../Whiteboard/QuestionDisplay';
import { saveQuestionToStorage } from '../Whiteboard/QuestionDisplay';
import { useQuestionContext } from './QuestionContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './QuestionSelect.css';

const QuestionSelect = () => {
  const [selected, setSelected] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useOutletContext();
  const [rows, setRows] = React.useState(null);
  const navigate = useNavigate();

  const rowKeys = ['id', 'questionId', 'title', 'question', 'category', 'difficulty', 'completed'];

  const headers = [
    { id: 'completed', numeric: false, disablePadding: true, label: 'Completed' },
    { id: 'title', numeric: false, disablePadding: true, label: 'Question' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'difficulty', numeric: false, disablePadding: false, label: 'Difficulty' }
  ];

  const { questions } = useQuestionContext();

  React.useEffect(() => {
    if (questions) {
      getAllHistory().then((history) => {
        const newRows = questions.map((question, index) => {

          // Convert array of categories to a comma-separated string
          const formattedCategories = question.categories
            ? question.categories.join(', ')
            : '';

          const checked = history.some(i => i.questionId === question.id)

          return createData(
            rowKeys,
            index,
            question.id,
            question.title || '',
            question.question_text || '',
            formattedCategories,
            question.difficulty,
            checked
          );
        });
        setRows(newRows);
      })
    }
  }, [questions]);

  // Empty string for Fermi questions
  const difficultyOrder = { Basic: 1, Intermediate: 2, Advanced: 3, "": 4 };

  const customComparators = {
    difficulty: (a, b) => {
      const aValue = difficultyOrder[a.difficulty] || 4;
      const bValue = difficultyOrder[b.difficulty] || 4;
      return bValue - aValue;
    },
  };

  function renderCellContent(key, value) {
    if (key === 'completed') {
      return <Checkbox checked={value} className="completed-column" />;
    } else if (key === 'category') {
      return <span className="category-column">{value}</span>;
    } else if (key === 'difficulty') {
      return <span className="difficulty-column">{value}</span>;
    }
    return value;
  }

  const handleOpen = (id) => {
    setSelected(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(-1);
    setOpen(false);
  };

  const handleNav = () => {
    sessionStorage.setItem("startTime", Date.now());
    saveQuestionToStorage(questions[selected])
    navigate("/whiteboard");
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: darkMode ? '#202124' : 'white',
    color: darkMode ? 'white' : '#202124',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  if (!rows) return null;

  return (
    <div>
      <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>Choose a question from the list below:</h1>
      {rows && (
        <DataTable
          headers={headers}
          data={rows}
          onRowSelect={(id) => handleOpen(id)}
          customComparators={customComparators}
          renderCellContent={renderCellContent}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm question selection:
          </Typography>
          {(questions && selected != -1) && (
            <>
              <Typography id="modal-modal-description" sx={{ textAlign: 'center', mt: 2 }}>
                <strong style={{ color: darkMode ? 'white' : '#202124' }}>
                  "{questions[selected].title}"
                </strong>
              </Typography>
              <Typography id="modal-modal-description" sx={{ textAlign: 'left', mt: 2 }}>
                <ReactMarkdownSpan text={questions[selected].question_text} />
              </Typography>
            </>
          )}
          <div className='button-container'>
            <Button sx={{ width: "100px", marginTop: '20px', marginRight: '20px' }} variant="contained" onClick={handleNav}>Confirm</Button>
            <Button sx={{ width: "100px", marginTop: '20px' }} variant="contained" onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default QuestionSelect;
