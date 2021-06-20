import CssBaseline from '@material-ui/core/CssBaseline';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PageLoadingIndicator } from './components';

const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const ReviewPage = lazy(() => import('./pages/ReviewPage'));
const ReviewCompletePage = lazy(() => import('./pages/ReviewCompletePage'));

const App = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Suspense fallback={<PageLoadingIndicator />}>
        <Switch>
          <Route exact path={['/', '/movie/:episodeIndex?']} component={MoviesPage} />
          <Route path="/review" component={ReviewPage} />
          <Route path="/review-complete" component={ReviewCompletePage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </>
);

export default App;
