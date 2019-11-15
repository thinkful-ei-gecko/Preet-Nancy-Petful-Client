import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import LandingPage from '../routes/LandingPage/LandingPage';
import AdoptionPage from '../routes/AdoptionPage/AdoptionPage';
import ErrorPage from '../routes/ErrorPage/ErrorPage';
import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to='/'>Petful Adoption Service</Link>
        </nav>
      </header>
      <main className="main">
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/adoptions' component={AdoptionPage}></Route>
          <Route component={ErrorPage}></Route>
        </Switch>
      </main>
    </div>
    )
  }
}
export default App;
