import React from 'react';
import ReactDOM from 'react-dom';
import { AddPerson } from './AddPerson';
import { AddRelation } from './AddRelation';

ReactDOM.render(
  <React.StrictMode>
    <AddPerson />
    {/* <FindPerson /> */}
    <AddRelation /> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
