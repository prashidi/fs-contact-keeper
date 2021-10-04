import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import "./App.css";
import About from "./components/pages/About";
import ContactState from "./context/contacts/ContactState";

const App = () => {
  return (
    <ContactState>
      <Router>
        <Navbar />
        <Fragment>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
};

export default App;
