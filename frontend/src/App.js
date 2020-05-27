import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/views/navbar'
import Home from './components/views/home'
import Login from './components/views/login'
import SignUp from './components/views/signup'
import Profile from './components/views/profile'

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Route exact path="/" component={SignUp} />
          <div className="container">
            <Route exact path="/home" component={Home}></Route>
            {/* <Route exact path="/signup" component={SignUp} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>
      </div>
    </Router>
  );
}

export default App;
