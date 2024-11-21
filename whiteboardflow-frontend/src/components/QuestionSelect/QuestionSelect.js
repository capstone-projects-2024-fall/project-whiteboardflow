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
import './QuestionSelect.css'


function createData(id, title, question, category, difficulty, completed) {
  return {
    id,
    title,
    question,
    category,
    difficulty,
    completed
  };
}

const rows = [
  createData(
    1,
    'Sum even numbers',
    'Write a function that takes a list of numbers and returns the sum of all even numbers in the list.',
    'Coding problems',
    'Basic',
    false
  ),
  createData(
    2,
    'How many licks does it take to get to the Tootsie Roll center of a Tootsie Pop?',
    'Write a function that takes a list of numbers and returns the sum of all even numbers in the list.',
    'Coding problems',
    'Basic',
    false
  ),createData(
    3,
    'Sum even numbers',
    'Write a function that takes a list of numbers and returns the sum of all even numbers in the list.',
    'Coding problems',
    'Basic',
    true
  ),
];

function descendingComparator(a, b, orderBy) {
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
  },{
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
            padding= "10px"
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
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function QuestionSelect() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  //eslint-disable-next-line
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    

    if (selectedIndex === -1) {
      setSelected([id]);
    } else {
      setSelected([])
    }
    
  };

  React.useEffect(() => {
    
  },[selected])

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

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  const navigate = useNavigate();

  const handleNav = () => {
    // Set the start time in localStorage
    localStorage.setItem("startTime", Date.now());
    // Redirect to the whiteboard page
    navigate("/whiteboard");
  };


	// eslint-disable-next-line
	const [darkMode, setDarkMode] = useOutletContext();

  return (
      <Box sx={{ width: '100%', paddingTop: '50px', display: "flex", flexDirection: "column", alignItems: 'center'}}>
        <h1 className= {darkMode ? 'q-header-dark' : 'q-header-light'}> Choose a question from the list below: </h1>
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

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="center">{row.completed ? <Checkbox color='white' checked disabled/> : <Checkbox color='white' disabled/>}</TableCell>
                      <TableCell sx={{color: darkMode ? "white" : "#202124"}} align="left">{row.title}</TableCell>
                      <TableCell sx={{color: darkMode ? "white" : "#202124"}}align="left">{row.category}</TableCell>
                      <TableCell sx={{color: darkMode ? "white" : "#202124"}}align="left">{row.difficulty}</TableCell>
                      {/* <TableCell align="left">{row.completed ? "True" : "False"}</TableCell> */}
                    </TableRow>
                  );
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
            sx={{color: darkMode ? "white" : "#202124"}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        {selected.length !== 0 && <Button sx={{width: "100px"}} variant="contained" onClick={handleNav} >Continue</Button>}
      </Box>
  );
}

export default QuestionSelect