import React from 'react';
import Header from './components/header';
import MainJumbotron from './components/jumbotron';
import ResultsContainer from './containers/resultsContainer';
import './app.css';

const App = () => {
  return (
    <div>
      <Header />
      <MainJumbotron />
      <ResultsContainer />
    </div>
  );
};

export default App;
