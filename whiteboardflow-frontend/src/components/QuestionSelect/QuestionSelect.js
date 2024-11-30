import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './QuestionSelect.css'
// import { color } from 'framer-motion';
import { useQuestionContext } from './QuestionContext';
import { saveQuestionToStorage } from '../Whiteboard/QuestionDisplay';

function createData(id, questionId, title, question, category, difficulty, completed) {
  return {
    id,
    questionId,
    title,
    question,
    category,
    difficulty,
    completed
  };
}

// Empty string for Fermi question difficulty
const difficultyOrder = { Basic: 1, Intermediate: 2, Advanced: 3, "": 4 };

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'difficulty') {
    const aValue = difficultyOrder[a[orderBy]] || 0;
    const bValue = difficultyOrder[b[orderBy]] || 0;
    return bValue - aValue;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'completed',
    numeric: false,
    disablePadding: true,
    label: '',
  }, {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Question',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'difficulty',
    numeric: false,
    disablePadding: false,
    label: 'Difficulty',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function QuestionSelect() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([0]);
  const [page, setPage] = React.useState(0);
  //eslint-disable-next-line
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { questions } = useQuestionContext();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (questions) {
      const newRows = questions.map((question, index) => {

        // Convert array of categories to a comma-separated string
        const formattedCategories = question.categories
          ? question.categories.join(', ')
          : '';

        return createData(
          index,
          question.id,
          question.title || '',
          question.question_text || '',
          formattedCategories,
          question.difficulty,
          question.completed || false
        );
      });

      setRows(newRows);
    }
  }, [questions]);

  // eslint-disable-next-line
  const [darkMode, setDarkMode] = useOutletContext();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    if (!rows || !Array.isArray(rows)) return [];
    return [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, rows]);

  const navigate = useNavigate();

  const handleNav = () => {
    sessionStorage.setItem("startTime", Date.now());
    saveQuestionToStorage(questions[selected])
    navigate("/whiteboard");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelected([0]);
    setOpen(false);
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);

    // console.log()

    if (selectedIndex === -1) {
      setSelected([id]);
      handleOpen();
    } else {
      setSelected([0]);
    }
  };

  return (
    <Box sx={{ width: '100%', paddingTop: '50px', display: "flex", flexDirection: "column", alignItems: 'center' }}>
      <h1 className={darkMode ? 'q-header-dark' : 'q-header-light'}> Choose a question from the list below: </h1>
      <Box sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                if (row.id === 0) {

                } else {

                  return (
                    <TableRow
                      hover
                      onClick={(event) => { handleClick(event, row.id); console.log(row)}}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="center">{row.completed ? <Checkbox color='white' checked disabled /> : <Checkbox color='white' disabled />}</TableCell>
                      <TableCell sx={{ color: darkMode ? "white" : "#202124" }} align="left">{row.title}</TableCell>
                      <TableCell sx={{ color: darkMode ? "white" : "#202124" }} align="left">{row.category}</TableCell>
                      <TableCell sx={{ color: darkMode ? "white" : "#202124" }} align="left">{row.difficulty}</TableCell>
                      {/* <TableCell align="left">{row.completed ? "True" : "False"}</TableCell> */}
                    </TableRow>
                  );
                }
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color: darkMode ? "white" : "#202124" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
          <Typography id="modal-modal-question" sx={{ textAlign: 'left', mt: 2 }}>
            <strong>"{selected[0] == 0 ? "" : rows.find(data => data.id === selected[0]).title}"</strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ textAlign: 'left', mt: 2 }}>
            {questions[selected].question_text}
          </Typography>
          <Button sx={{ width: "100px", marginTop: '20px' }} variant="contained" onClick={handleNav}>Confirm</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default QuestionSelect;
