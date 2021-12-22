import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Start from '../../src/components/Start';
import { RecoilRoot } from 'recoil';

describe('Home', () => {
  it('disables button when input is empty', () => {
    render(
      <RecoilRoot>
        <Start />
      </RecoilRoot>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('enables button when input is filled', () => {
    render(
      <RecoilRoot>
        <Start />
      </RecoilRoot>,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '田中' } });
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
