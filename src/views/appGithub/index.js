import React, { useState } from 'react';
import { connect } from 'react-redux';

import { styled as styledMaterial } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import styled from '@emotion/styled';

import LoadingIcon from '../../assets/gif/loading_icon.gif';
import GithubForm from './GithubForm';
import GithubItem from './GithubItem';
import { actionFetchRepository } from '../../redux/repository';

const Container = styled('div')({
  backgroundColor: '#fff',
  width: '100%',
  height: 'calc(100vh - 10px)',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  flex: '1 auto'
});

const LoadingContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  background: '#fff',
  zIndex: 999
});

const StyledTableContainer = styled('div')({
  margin: '30px 10%'
});

const StyledTableCell = styledMaterial(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const GithubPage = ({
  currentFilter,
  isFetching,
  repositories,
  totalCount,
  actionFetchRepository
}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_, newPage) => {
    console.log('go here', newPage);
    setPage(newPage);
    actionFetchRepository(currentFilter, rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('go here~', parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    actionFetchRepository(currentFilter, parseInt(event.target.value, 10), 0);
  };

  return (
    <Container>   
      {
        isFetching && (
          <LoadingContainer>
            <img
              src={LoadingIcon}
              alt="Loading Icon"
            />
          </LoadingContainer>
        )
      }
      <StyledTableContainer>
        <h2>Github Repository Filter</h2>
        <GithubForm />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Owner</StyledTableCell>
                <StyledTableCell align="center">Star(s)</StyledTableCell>
                <StyledTableCell align="center">Fork(s)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                !isFetching && repositories && repositories.length !== 0 && repositories.map(data => (
                  <GithubItem
                    key={`repository_${data.id}`}
                    item={data}
                  />
                ))
              }
              {
                repositories && repositories.length === 0 && (
                  <TableRow>
                    <StyledTableCell colSpan="5" align="center">No data found! Please try again!</StyledTableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        {
          (!isFetching && repositories && repositories.length !== 0) && (
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )
        }
      </StyledTableContainer>
    </Container>
  );
};

export default connect(
  (state) => ({
    repositories: state.appRepository.repositories,
    totalCount: state.appRepository.totalCount,
    isFetching: state.appRepository.isFetching,
    currentFilter: state.appRepository.filters.search
  }),
  {
    actionFetchRepository
  }
)(GithubPage);
