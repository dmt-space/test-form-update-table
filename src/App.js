import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UpdateUsersTableForm from './components/UpdateUsersTableForm.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Test example of the update table form.
          </p>
          <a
            className="App-link"
            href="#main"
          >
            Explore
          </a>
        </header>
        <section id="main">
        <UpdateUsersTableForm />
        </section>
      </div>
    );
  }
}

export default App;
