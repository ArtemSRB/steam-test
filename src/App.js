import React, { Component } from 'react';
// import { Provider } from 'react-redux';
import logo from './header_logo.png';
import {
    Body,
    Logo
} from './components/Css'
import Form from './components/form'



class App extends Component {


  render() {
    return (
          <Body>
        <header className="App-header">
            <a href="/" ><Logo src={logo} alt="logo" /></a>
        </header>
            <Form />
          </Body>
    );
  }
}

export default App;
