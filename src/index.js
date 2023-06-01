import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import App from "./App"
import About from "./pages/about"

ReactDOM.render(
    <Router>
        <App/>
    </Router>, 
    document.getElementById("root")
    
)
