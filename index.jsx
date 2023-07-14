import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import App from "./App.jsx";
import "./styles.scss";

const appRouting = (
    <Router>
        <Routes>
            <Route exact path="/" component={App} />
        </Routes>
    </Router>
);

ReactDOM.render(appRouting, document.getElementById("root"));
