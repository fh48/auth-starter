import React, {Component, Fragment} from 'react';

import Login from './Login/';
import Signup from './Signup/';

import * as Styled from './styled';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Hello World!</h1>
        <Login />
        <Signup />
      </Fragment>
    );
  }
}

export default App;
