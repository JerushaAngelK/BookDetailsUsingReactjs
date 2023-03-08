import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListBookComponent from './components/ListBookComponent';
import CreateBookComponent from './components/CreateBookComponent';
import ViewBookComponent from './components/ViewBookComponent';
import UpdateBookComponent from './components/UpdateBookComponent';

function App() {
  return (
    <div>
        <Router>
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListBookComponent}></Route>
                          <Route path = "/mink" component = {ListBookComponent}></Route>
                          <Route path = "/add/:id" component = {CreateBookComponent}></Route>
                          <Route path = "/edit/:id" component = {UpdateBookComponent}></Route>
                          <Route path = "/view/:id" component = {ViewBookComponent}></Route>
                    </Switch>
                </div>
        </Router>
    </div>
    
  );
}

export default App;
