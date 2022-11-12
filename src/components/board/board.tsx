import React, { FC, useState } from "react";
import Box from "../box/box";
import './board.css';

const X = 'X';
const O = 'O';

const initGameState = ([columns, rows]: Array<number>): string[][] => {
    const gameState = [];
    for (let i = 0; i < rows; i++) {
        const row: Array<string> = [];
        for (let j = 0; j < columns; j++) {
            row.push('');
        }
        gameState.push(row);
    }
    return gameState;
};

export const Board: FC = () => {
    const [playerValue, setPlayerValue] = useState(X);
    const [gridSize, setGridSize] = useState([3, 3]);
    const [columns, rows] = gridSize;
    const [gameState, setGameState] = useState(initGameState(gridSize));

    const togglePlayerValue = () => {
        if (playerValue !== X) setPlayerValue(X);
        else setPlayerValue(O);
    }

    const renderRow = (i: number): JSX.Element => {
        const row: Array<JSX.Element> = [];
        for (let j = 0; j < columns; j++) {
            row.push(
                <Box 
                    key={j}
                    position={[i, j]} 
                    gameState={gameState} 
                    setGameState={setGameState} 
                    value={gameState[i][j]} 
                    playerValue={playerValue}
                    togglePlayerValue={togglePlayerValue}
                />
            );
        }
        return (
            <div key={i} className="row">
                {row}
            </div>
        );
    };

    const renderGrid = () => {
        const grid: Array<JSX.Element> = [];
        for (let i = 0; i < rows; i++) {
            grid.push(renderRow(i));
        }
        return (
            <div className="grid">
                {grid}
            </div>
        );
    }

    const handleGridChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        e.preventDefault();
        const newGridSize: Array<number> = e.currentTarget.value.split('x').map(val => Number(val));
        setGameState(initGameState(newGridSize))
        setGridSize(newGridSize);
    }

    const saveGame = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        localStorage.setItem('game-state', JSON.stringify(gameState));
    }

    const loadGame = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const savedGameState = JSON.parse(localStorage['game-state']);
        if (!savedGameState || !savedGameState.length) return;
        setGameState(savedGameState);
        setGridSize([savedGameState.length, savedGameState[0].length]);
    }

    const resetGame = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setGameState(initGameState(gridSize));
    }

    const gridSelect: JSX.Element = ( 
        <div>
            <select value={gridSize.join('x')} onChange={handleGridChange}>
                <option value="3x3">3x3</option>
                <option value="4x4">4x4</option>
                <option value="5x5">5x5</option>
                <option value="6x6">6x6</option>
            </select>
        </div>
    );

    const saveStateBtn: JSX.Element = (
        <button onClick={saveGame}>Save Game</button>
    );

    const loadStateBtn: JSX.Element = (
        <button onClick={loadGame}>Load Game</button>
    )

    const resetBtn: JSX.Element = (
        <button onClick={resetGame}>Reset</button>
    )

    return (
        <>
            {gridSelect}
            {renderGrid()}
            {saveStateBtn}
            {loadStateBtn}
            {resetBtn}
        </>
    );
};

export default Board;