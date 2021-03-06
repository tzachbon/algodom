import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { getMainColor } from './styles';

const theme = createMuiTheme({
  palette: {
    background: {},
    primary: {
      light: '#fff',
      main: getMainColor(),
      dark: '#333',
    },
    secondary: {
      main: '#40739e',
      light: '#fff',
      contrastText: '#eee',
    },
  },
  typography: {
    fontFamily: 'Nunito Sans, Roboto, sans-serif',
    fontSize: 20,
    allVariants: {
      color: getMainColor(),
    },
  },
});

const Theme = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default Theme;
