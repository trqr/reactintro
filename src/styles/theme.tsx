import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
                primary: {
                    main: '#A14A76',
                },
                secondary: {
                    main: '#e9727c',
                },
                background: {
                    default: '#fbf5f3',
                },
                text: {
                    primary: '#000000',
                    secondary: '#000000',
                },
                divider: '#A14A76',
                action: {}
            },
        },
        dark: {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#A14A76',
                },
                secondary: {
                    main: '#e9727c',
                },
            },
        },
    },
});

export default theme;