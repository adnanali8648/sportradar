import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Match from './Match';

describe('Match component', () => {
  const mockUpdateMatch = jest.fn();
  const mockFinishMatch = jest.fn();

  const matchData = {
    id: 1,
    homeTeam: 'Home',
    awayTeam: 'Away',
    homeScore: 2,
    awayScore: 1,
    updateMatch: mockUpdateMatch,
    finishMatch: mockFinishMatch,
  };

  test('renders match details correctly', () => {
    render(<Match {...matchData} />);

    const homeTeamElement = screen.getByText('Home');
    const awayTeamElement = screen.getByText('Away');
    const scoreElement = screen.getByText('2-1');

    expect(homeTeamElement).toBeInTheDocument();
    expect(awayTeamElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });

  test('renders edit and delete buttons when updateMatch is true', () => {
    render(<Match {...matchData} />);

    const editButton = screen.getByText('Update Score');
    const finishButton = screen.getByText('Finish Match');

    expect(editButton).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
  });

  test('calls updateMatch with the correct arguments when update button is clicked', () => {
    render(<Match {...matchData} />);

    const editButton = screen.getByText('Update Score');
    fireEvent.click(editButton);

    expect(mockUpdateMatch).toHaveBeenCalled();
  });

  test('calls finishMatch with the correct argument when delete button is clicked', () => {
    render(<Match {...matchData} updateMatch />);

    const finishButton = screen.getByText('Finish Match');
    fireEvent.click(finishButton);

    expect(mockFinishMatch).toHaveBeenCalledWith(1);
  });
});
