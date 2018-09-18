//import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/home.css';
import Home from './components/Home.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
