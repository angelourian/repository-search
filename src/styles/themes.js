import { createTheme } from '@mui/material/styles';

let themes = createTheme({
  typography: {
    fontFamily: '\'Rubik\', sans-serif',
    fontSize: 14
  },
});

themes = {
  ...themes,
  // other customized themes here
};

export default themes;
