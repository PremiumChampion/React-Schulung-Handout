import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Notizanzeige from './components/Notizanzeige';
import { initializeIcons } from '@fluentui/react';

initializeIcons();

ReactDOM.render(
  <Notizanzeige />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
