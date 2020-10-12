import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Game from './components/Game'
import Home from './components/Home'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';;

function App() {

  return (
    <>
      <Router>
        <Container fixed>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
            <Switch>
              <Route exact path="/game" component={Game} />
            </Switch>
            <Switch>
              <Route exact path={['/', '/home']} component={Home} />
            </Switch>

          </Typography>
        </Container>
      </Router>
    </>
  );
}
export default App;





