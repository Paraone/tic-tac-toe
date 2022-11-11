import React, { FC, useState } from "react";
import PropTypes from 'prop-types';
import './box.css';

interface IBox {
    playerValue: string,
    togglePlayerValue: () => void
}

export const Box: FC<IBox> = (props: IBox) => {
    const { playerValue, togglePlayerValue } = props;
    const [value, setValue] = useState('');

    const click = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (value) return;
        setValue(playerValue);
        togglePlayerValue();
    };

    return (
        <div onClick={click} className={`box ${value}`}>{value}</div>
    );
};

Box.propTypes = {
    playerValue: PropTypes.string.isRequired,
    togglePlayerValue: PropTypes.func.isRequired
}

export default Box;