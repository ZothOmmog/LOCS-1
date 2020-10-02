import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './features/app';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <App />
                </MuiPickersUtilsProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
