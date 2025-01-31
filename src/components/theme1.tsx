import { radiantDarkTheme } from 'react-admin';
import { createTheme } from '@mui/material/styles';

const myCustomTheme = createTheme({
    ...radiantDarkTheme,
    palette: {
      ...radiantDarkTheme.palette,
      primary: {
        main: '#07ffd6', 
      },
      secondary: {
        main: '#8e36f1', 
      },
      background: {
        default: '#0f0f0fc7',
        paper: '#1e1e1e',   
      },
      text: {
        primary: '#ffffff', 
        secondary: '#8e36f1', 
      },
      action:{
        active: '#fff',
        selected: '#ff0',
        disabled: '#eff',
        disabledBackground: '#cdf',
      },
      divider: '#32fa24',
    },
    typography: {
      fontFamily: 'Roboto, sans-serif', 
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
    },

    unstable_sxConfig:{
        borderColor: {
            themeKey: 'palette',

        },
        bgcolor: {
            themeKey: 'palette',
        }
    }
 
  });

  export default myCustomTheme