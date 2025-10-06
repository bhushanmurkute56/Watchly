import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router";
import App from './App.jsx';
import Home from './../Views/Home.jsx';
import './index.css';
import NotFound from './Components/NotFound.jsx';
import WatchlyDetails from './Components/WatchlyDetails.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="*" element={<NotFound />}/>
      <Route path='/watchly/:id' element={<WatchlyDetails />}></Route>
    </Routes>
  </BrowserRouter>
);