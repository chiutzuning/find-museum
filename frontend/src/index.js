import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
