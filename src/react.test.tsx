import React from 'react';
import ReactDOM from 'react-dom';
import RegionSelector from './components/RegionSelector/RegionSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegionSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
