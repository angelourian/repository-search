import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import isEmpty from '../../utils/isEmpty';
import {
  actionFetchRepository
} from '../../redux/repository';

const Container = styled('div')({
  display: 'flex',
  margin: '30px 0',
  justifyContent: 'space-between'
});

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#0b6bf2',
  color: '#fff',
  minWidth: 200,
  height: 50,
  fontSize: 15,
  borderRadius: 5,
  '&:hover': {
    backgroundColor: '#0243eb'
  },
  '&:disabled': {
    backgroundColor: '#dbe9fd',
    color: '#fff',
  }
}));

const GithubForm = ({
  actionFetchRepository
}) => {
  const [repository, setRepository] = useState('');

  const handleAdd = () => {
    actionFetchRepository(repository);
  };

  return (
    <Container>
      <Box
        sx={{
          width: '70%',
          maxWidth: '100%',
        }}
      >
        <TextField
          fullWidth
          label="Repository"
          id="repo"
          placeholder="Enter Github respository"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
        />
      </Box>
      <StyledButton
        onClick={handleAdd}
        disabled={isEmpty(repository)}
      >
        Submit
      </StyledButton>
    </Container>
  );
};

export default connect(
  () => ({}),
  {
    actionFetchRepository
  }
)(GithubForm);

