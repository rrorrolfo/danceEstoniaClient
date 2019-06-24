import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EventsRoutes from './EventsRoutes';
import FestivalsRoutes from './FestivalsRoutes';
import NotFound from '../components/notFound';

const AppRoutes = ({ fetchEvents, fetchFestivals }) => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/events" />} />
      <Route
        path="/events"
        render={() => (
          <EventsRoutes
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
          />
        )}
      />
      <Route
        path="/festivals"
        render={() => (
          <FestivalsRoutes
            fetchEvents={fetchEvents}
            fetchFestivals={fetchFestivals}
          />
        )}
      />
      <Route path="/notfound" component={NotFound} />
      <Route render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
};

export default AppRoutes;
