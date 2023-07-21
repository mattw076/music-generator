import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./App.jsx";

// const appRouting = (
//     <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App/>}>
//             <App />
//           </Route>
//         </Routes>
//       </BrowserRouter>
// );

ReactDOM.render(<App />, document.getElementById("root"));
