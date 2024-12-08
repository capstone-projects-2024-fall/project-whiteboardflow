import * as React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useOutletContext } from 'react-router-dom';
import './DataTable.css';

export function createData(keys, ...args) {
  // Create an object with the keys mapped to the arguments
  const data = {};

  keys.forEach((key, index) => {
    // If there's an argument for this key, assign it; otherwise, assign an empty string.
    data[key] = args[index] !== undefined ? args[index] : '';
  });

  return data;
}

function EnhancedTableHead(props) {
  const { headers, order, orderBy, onRequestSort } = props;
  const [darkMode] = useOutletContext();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.numeric ? 'right' : 'left'}
            sortDirection={orderBy === header.id ? order : false}
          >
            <TableSortLabel
              direction={orderBy === header.id ? order : 'asc'}
              onClick={createSortHandler(header.id)}
              sx={{
                fontWeight: 'bold',
                color: darkMode ? 'white' : 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                },
                '&:focus': {
                  color: darkMode ? 'white' : 'text.primary',
                },
                '&:hover:focus': {
                  color: 'primary.main',
                },
              }}
            >
              {header.label}
              {orderBy === header.id ? (
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
  headers: PropTypes.array.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

function DataTable({
  headers,
  data,
  onRowSelect,
  defaultOrder = 'asc',
  defaultOrderBy = 'id',
  customComparators,
  renderCellContent,
}) {
  const [order, setOrder] = React.useState(defaultOrder);
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [darkMode] = useOutletContext();

  const descendingComparator = React.useCallback((a, b, orderBy) => {
    // Check for custom comparator from props
    if (customComparators && customComparators[orderBy]) {
      return customComparators[orderBy](a, b);
    }

    // Default sorting logic
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }, [customComparators]);

  const getComparator = React.useCallback((order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }, [descendingComparator]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    if (!data) return [];
    return [...data]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, data, getComparator]);

  const paginationButtonStyles = {
    color: darkMode ? "white" : "#202124",
    '&.Mui-disabled': {
      color: darkMode ? '#666666' : '#B0B0B0',
    },
  };

  const handleClick = (event, id) => {
    onRowSelect(id);
  };

  if (!data)
    return null;

  return (
    <Box sx={{ width: '100%', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            headers={headers}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow
                hover
                key={row.id}
                onClick={(event) => handleClick(event, row)}
                sx={{ cursor: 'pointer' }}
              >
                {headers.map((header) => (
                  <TableCell sx={{ color: paginationButtonStyles.color }} key={header.id} align={header.numeric ? 'right' : 'left'}>
                    {renderCellContent(header.id, row[header.id])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: paginationButtonStyles.color,
          '& .MuiTablePagination-selectIcon': {
            color: paginationButtonStyles.color
          },
        }}
        slotProps={{
          actions: {
            previousButton: {
              sx: paginationButtonStyles,
            },
            nextButton: {
              sx: paginationButtonStyles,
            },
          },
        }}
      />
    </Box>
  );
}

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowSelect: PropTypes.func.isRequired,
  defaultOrder: PropTypes.string,
  defaultOrderBy: PropTypes.string,
};

export default DataTable;
