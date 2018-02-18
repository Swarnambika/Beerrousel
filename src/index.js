import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Quattrocento Sans :300, 400, 700',
        'Roboto: 300, 400, 700',
        'Roboto Slab: 300, 400, 700',
        'Roboto Mono: 300, 400, 700',
        'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
