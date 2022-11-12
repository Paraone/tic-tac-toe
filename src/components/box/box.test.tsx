import {render, screen} from '@testing-library/react'
import Box from './box';

test('should show a Box Component', () => {
  render (
    <Box 
        playerValue='X' 
        value='X'
        gameState={[
            ['X', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ]} 
        position={[0, 0]}
        togglePlayerValue={() => {}} 
        setGameState={() => {}}
    />
);
  const input = screen.getByText('X')
  // Events and assertions...
  expect(input).toBeTruthy();
})