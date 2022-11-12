import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from './board';

describe('Board Component:', () => {

    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(() => null)
        },
        writable: true
      });
    });

    test('should show a Board Component', () => {
        render (<Board />);
    
        const resetBtn = screen.getByText(/reset/i);
        const saveGameBtn = screen.getByText(/Save Game/i);
        const loadGameBtn = screen.getByText(/Load Game/i);
        const gridBox = screen.getByTestId('0-0');
        const gridSelect = screen.getByTestId('gridSelect')
    
        expect(gridSelect).toBeInTheDocument();
        expect(gridBox).toBeInTheDocument();
        expect(resetBtn).toBeInTheDocument();
        expect(saveGameBtn).toBeInTheDocument();
        expect(loadGameBtn).toBeInTheDocument();
    });

    test('Should render playerValue in Box after onClick', async () => {
        render (<Board />);

        let box = screen.getByTestId('0-0');
        await userEvent.click(box);
        box = screen.getByText('X');
        expect(box).toBeInTheDocument();
    });

    test('expect grid to change', async () => {
        render (<Board />);

        const gridSelect = screen.getByTestId('gridSelect');
        fireEvent.change(gridSelect, {target: {value: '4x4'}})
        const box = screen.getByTestId('3-3');
        expect(box).toBeInTheDocument();
    });

    test('Should save gameState to localStorage', async () => {
        render (<Board />);
        let box = screen.getByTestId('0-0');
        await userEvent.click(box);
        box = screen.getByTestId('1-1');
        await userEvent.click(box);
        box = screen.getByTestId('2-2');
        await userEvent.click(box);
        const saveBtn = screen.getByTestId('saveBtn');
        await userEvent.click(saveBtn);
        expect(window.localStorage.setItem)
        .toHaveBeenCalledWith(
            'game-state','[[\"X\",\"\",\"\"],[\"\",\"O\",\"\"],[\"\",\"\",\"X\"]]'
        );
    });

    test('Should load gameState from localStorage', async () => {
        render (<Board />);

        const loadBtn = screen.getByTestId('loadBtn');
        await userEvent.click(loadBtn);
        expect(window.localStorage.getItem).toHaveBeenCalledWith('game-state');
    });

    test('should reset grid', async () => {
        render (<Board />);

        let box = screen.getByTestId('0-0');
        expect(box.innerHTML).toBe('');
        await userEvent.click(box);
        box = screen.getByTestId('0-0');
        expect(box.innerHTML).toBe('X');
        const resetBtn = screen.getByTestId('resetBtn');
        await userEvent.click(resetBtn);
        box = screen.getByTestId('0-0');
        expect(box.innerHTML).toBe('');
    });
})