import React, { FC } from "react";
import { string as pString, func as pFunc, array as pArray} from 'prop-types';
import './box.css';

interface IBox {
    playerValue: string,
    value: string,
    gameState: string[][],
    position: number[],
    togglePlayerValue: () => void,
    setGameState: (gameState: string[][]) => void,
}

export const Box: FC<IBox> = (props: IBox) => {
    const { playerValue, value, togglePlayerValue, gameState, position, setGameState } = props;
    const [i, j] = position;

    const click = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (gameState[i][j]) return;
        const newGameState = [...gameState]
        newGameState[i][j] = playerValue;
        setGameState(newGameState);
        togglePlayerValue();
    };

    return (
        <div 
            data-testid={`${i}-${j}`} 
            onClick={click} 
            className={`box ${value}`}
        >
            {value}
        </div>
    );
};

Box.propTypes = {
    playerValue: pString.isRequired,
    value: pString.isRequired,
    togglePlayerValue: pFunc.isRequired,
    position: pArray.isRequired, 
    gameState: pArray.isRequired,
    setGameState: pFunc.isRequired
}

export default Box;