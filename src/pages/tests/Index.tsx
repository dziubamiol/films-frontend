import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { Provider } from 'react-redux';
import store from '../../store';
import App from '../../App';
import React from 'react';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: green
    },
});

function Index () {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    );
}

export default Index;
