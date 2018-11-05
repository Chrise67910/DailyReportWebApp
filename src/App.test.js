import React from 'react';
import ReactDOM from 'react-dom';
import normalize from 'normalize.css';
import siemensreportweb from 'siemens-report-web.webflow.css';
import webflow from 'webflow.css'
import App from 'Components./App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
