import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from './redux/store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const store = createReduxStore({});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
