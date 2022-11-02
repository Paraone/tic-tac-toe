import React, { FC, useState } from "react";
import Box from "../box/box";
import './board.css';

const X = 'X';
const O = 'O';

export const Board: FC = () => {
    const [playerValue, setPlayerValue] = useState(X);
    const [gridSize, setGridSize] = useState([3, 3]);

    const [columns, rows] = gridSize;

    const togglePlayerValue = () => {
        if (playerValue === X) setPlayerValue(O);
        else setPlayerValue(X);
    }

    const renderRow = (i: number): JSX.Element => {
        let row: Array<JSX.Element> = [];
        for (let j = 0; j < columns; j++) {
            row.push(<Box key={j} playerValue={playerValue} togglePlayerValue={togglePlayerValue}/>);
        }
        return (
            <div key={i} className="row">
                {row}
            </div>
        );
    };

    const renderGrid = () => {
        let grid: Array<JSX.Element> = [];
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
        const value: Array<number> = e.currentTarget.value.split('x').map(val => Number(val));
        console.log({ value })
        setGridSize(value);
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
    )

    return (
        <>
            {gridSelect}
            {renderGrid()}
        </>
    );
};

export default Board;