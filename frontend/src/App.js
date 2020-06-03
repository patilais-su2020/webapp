import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/views/navbar'
import Home from './components/views/home'
import Login from './components/views/login'
import SignUp from './components/views/signup'
import AppWrapper from './components/views/AppWrapper'
import Profile from './components/views/profile'
import Uploaded from './components/views/uploaded'
import UpdateBook from './components/views/updatebook'
import UploadBook from './components/views/bookupload'
import Cart from './components/views/Cart'

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
          <div className="container">
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/view" component={Uploaded} />
            <Route exact path="/bookupload" component={UploadBook} />
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/updatebook/:isbn" component={UpdateBook}/> 
            <Route exact path="/cart" component={Cart}></Route> 
          </div>
          <Route path="/" component={AppWrapper} />
      </div>
    </Router>
  );
}

export default App;
