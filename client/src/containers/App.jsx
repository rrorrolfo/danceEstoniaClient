import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from '../components/header';
import MainJumbotron from '../components/jumbotron';
import ResultsContainer from './resultsContainer';
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact render={() => <Redirect to="/events" />} />
        <Route
          path="/:category"
          render={({ match }) => (
            <React.Fragment>
              <MainJumbotron match={match} />
              <ResultsContainer match={match} />
            </React.Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
