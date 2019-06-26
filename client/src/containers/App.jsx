import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/header';
import AppRoutes from '../routes';
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
