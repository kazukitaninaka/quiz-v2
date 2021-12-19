import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', () => {
  it('renders a entry', () => {
    render(<Home />);

    const nameInputNode = screen.getByRole('textbox');

    expect(nameInputNode).toBeInTheDocument();
  });
});
