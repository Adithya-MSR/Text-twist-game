import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from "firebase"
import 'antd/dist/antd.css';
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp ({
    apiKey: "AIzaSyDzHrYOmiHCxxJxCJBkQImH-7baVqqjmp8",
    authDomain: "texttwist-1a9b7.firebaseapp.com",
    databaseURL: "https://texttwist-1a9b7.firebaseio.com",
    projectId: "texttwist-1a9b7",
    storageBucket: "texttwist-1a9b7.appspot.com",
    messagingSenderId: "673791768760",
    appId: "1:673791768760:web:b944bef9caad46a9ba1c4d",
    measurementId: "G-3RR2LL8LTK"
  });

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
