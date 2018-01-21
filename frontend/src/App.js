import React, { Component } from 'react';
import Navbar from './components/navbar'
import Category from './components/category'
import EditPost from './components/editPost'
import { Route, Switch } from 'react-router-dom'
import Post from './components/post'
import AddPostComponent from './components/addPost'
import ErrorPage from './components/errorPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/404" component={ErrorPage} />
            <Route exact path="/" component={Category} />
            <Route path="/add" component={AddPostComponent} />
            <Route exact path="/:category" component={Category} />
            <Route exact path="/:category/:id" component={Post} />
            <Route exact path="/:category/:id/edit" component={EditPost} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
