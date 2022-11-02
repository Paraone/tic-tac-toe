import React, { FC } from 'react';
import './App.css';
import Board from './components/board/board';

export const App: FC = () => (
  <div className="App">
    <header className="App-header">
      Tick-Tac-Toe
    </header>
    <Board />
  </div>
);

export default App;
