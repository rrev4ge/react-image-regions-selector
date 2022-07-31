import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppLayout } from './layout';
import HomePage from './pages/Home/HomePage';
import { ThemeProvider } from './themes';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/">
        <AppLayout>
          <Switch>
            <Route
              path={["/react-image-regions-selector-example", '/']}
              component={HomePage}
            />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
