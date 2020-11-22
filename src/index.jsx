import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home';

ReactDOM.render(
  <React.StrictMode>

    <div className="p-3 mb-2 bg-info text-white">
      <HomePage />
    </div>

  </React.StrictMode>,
  document.getElementById('root'),
);
