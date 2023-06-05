import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary from './Summary';

jest.mock('./Match', () => () => <div data-testid="mock-match" />);

describe('Summary component', () => {
  test('renders the summary of matches', () => {
    const matches = [
      {
        id: 1,
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: 2,
        awayScore: 1,
      },
      {
        id: 2,
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        homeScore: 0,
        awayScore: 0,
      },
    ];

    render(<Summary matches={matches} />);

    const summaryMatches = screen.getAllByTestId('mock-match');

    expect(summaryMatches).toHaveLength(2);
  });

});