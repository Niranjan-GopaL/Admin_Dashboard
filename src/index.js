import React from "react";
import ReactDOM  from "react-dom";

import App from './App';
import './index.css'
import { ContextProvider } from "./context/ContextProvider";



ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>
,document.getElementById('root'));

// the only file that imports React and ReactDOM.
// the only lines that remain same throughout most of React projects