import React from "react";
import { createRoot } from 'react-dom/client';

//import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
