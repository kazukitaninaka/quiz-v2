import React from 'react';
import { render } from '@testing-library/react';
import Start from '../../src/components/Start';

describe('Home', () => {
  it('disables button when input is empty', () => {
    const startGame = jest.fn();
    const setPlayerData = jest.fn();
    const { container, getByRole } = render(
      <Start startGame={startGame} setPlayerData={setPlayerData} playersName='' />,
    );
    expect(getByRole('button')).toBeDisabled();
  });
  it('enables button when input is empty', () => {
    const startGame = jest.fn();
    const setPlayerData = jest.fn();
    const { container, getByRole } = render(
      <Start startGame={startGame} setPlayerData={setPlayerData} playersName='田中' />,
    );
    expect(getByRole('button')).not.toBeDisabled();
  });
});
