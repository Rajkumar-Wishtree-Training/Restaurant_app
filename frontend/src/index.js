import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import {positions , transitions , Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const options = {
    timeout : 5000,
    position : positions.BOTTOM_CENTER,
    transition : transitions.SCALE 
  }
root.render(
   <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
            <App />
        </Provider>
    </AlertProvider>
   </BrowserRouter>
)




