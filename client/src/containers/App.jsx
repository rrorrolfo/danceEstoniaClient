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
          render={({ match }) =>
            match.params.category === 'events' ||
            match.params.category === 'festivals' ? (
              <React.Fragment>
                <MainJumbotron match={match} />
                <ResultsContainer />
              </React.Fragment>
            ) : (
              // Should be redirected to not found route
              <Redirect to="/events" />
            )
          }
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
