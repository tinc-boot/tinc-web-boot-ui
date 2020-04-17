import './index.css'

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {dispatcher} from "./store";
import {SWStatus} from "./store/slices/system";
import {App} from "./bootstrap/App";
import {faInit} from "./bootstrap/fa";

console.log('Start ui!')

faInit()

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onRegistration: reg => {
    if (reg.waiting || reg.installing) {
      dispatcher.system.setStatus(SWStatus.WAITING)
    }
    if (reg.waiting) {
      dispatcher.system.setSW(reg.waiting)
    } else if (reg.installing) {
      dispatcher.system.setSW(reg.installing)
    }
  },
  onUpdate: reg => {
    if (reg.waiting || reg.installing) {
      dispatcher.system.setStatus(SWStatus.WAITING)
    }
    if (reg.waiting) {
      dispatcher.system.setSW(reg.waiting)
    } else if (reg.installing) {
      dispatcher.system.setSW(reg.installing)
    }
  },
  onSuccess: reg => {
    dispatcher.system.setStatus(SWStatus.ACTIVE);
    if (reg.waiting) {
      dispatcher.system.setSW(reg.waiting)
    } else if (reg.installing) {
      dispatcher.system.setSW(reg.installing)
    }
  }
});
