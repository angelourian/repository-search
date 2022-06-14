import React from 'react';

import { styled as styledMaterial } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styledMaterial(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styledMaterial(TableRow)(({ theme, disabled }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  }
}));

const GithubItem = ({ item }) => (
  <StyledTableRow key={item.name}>
    <StyledTableCell  component="th" scope="row">{item.id}</StyledTableCell>
    <StyledTableCell>{item.name}</StyledTableCell>
    <StyledTableCell>{item.owner.login}</StyledTableCell>
    <StyledTableCell align="center">{item.stargazers_count}</StyledTableCell>
    <StyledTableCell align="center">{item.forks}</StyledTableCell>
  </StyledTableRow>
);

export default GithubItem;
