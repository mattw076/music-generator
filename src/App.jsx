import React from "react";
import "./App.scss";

import HeaderBar from "./components/HeaderBar/HeaderBar.jsx";
import GenrePicker from "./components/GenrePicker/GenrePicker.jsx";

const App = () => {
    return (
        <div>
            <HeaderBar />
            <GenrePicker />
        </div>
    )
};

export default App;
