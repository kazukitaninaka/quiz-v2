import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Ranking from '../../src/pages/ranking';
import { RecoilRoot } from 'recoil';

describe('ranking page', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Ranking />
      </RecoilRoot>,
    );
  });
  it('renders heading', async () => {
    expect(screen.getByText('Ranking Page')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => screen.getByRole('table'));
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
