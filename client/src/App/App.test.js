import React from 'react';
import {shallow} from 'enzyme';

import App from './App';

describe('App', () => {
  let node;

  it('should render the application', () => {
    node = shallow(<App />);

    expect(node.debug()).toMatchSnapshot();
  });
});
