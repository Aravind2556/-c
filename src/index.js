import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import DataContextProvider from './context/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DataContextProvider>
);

