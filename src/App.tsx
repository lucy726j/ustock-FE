import './App.css';
import React from 'react';
import { GlobalStyle } from './Styles/GlobalStyles';
import Router from './Router';
import "./App.css"

function App() {
  return (
    <>
        <GlobalStyle />
            <div className='app-container'>
                <div className='content'>
                  <Router />
                </div>
            </div>
    </>
  );
}

export default App;
