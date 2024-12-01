import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Modal } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

const rows = [
    { id: 1, title: 'Sum even numbers', score: '76%', date: '2024/11/11', category: 'Coding problems', difficulty: 'Basic', feedback: 'You did fine' },
    { id: 2, title: 'How many licks...', score: '32%', date: '2024/11/13', category: 'Coding problems', difficulty: 'Basic', feedback: 'You suck' },
    { id: 3, title: 'Sum even numbers', score: '100%', date: '2024/11/20', category: 'Coding problems', difficulty: 'Basic', feedback: 'You are great' },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => onRequestSort(event, property);
    const headCells = [
        { id: 'title', label: 'Question' },
        { id: 'score', label: 'Score' },
        { id: 'date', label: 'Date' },
        { id: 'category', label: 'Category' },
        { id: 'difficulty', label: 'Difficulty' },
    ];

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
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
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

export default function Dashboard() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedRows = useMemo(() => {
        const comparator = (a, b) =>
            order === 'desc'
                ? b[orderBy].localeCompare(a[orderBy])
                : a[orderBy].localeCompare(b[orderBy]);
        return rows.slice().sort(comparator);
    }, [order, orderBy]);

    const displayedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer>
                <Table>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {displayedRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.difficulty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPage={rowsPerPage}
                page={page}
                count={rows.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}
