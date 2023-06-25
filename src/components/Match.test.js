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
    homeScore: 1,
    awayScore: 1,
    goalHistory: [{
      homeScore: 0,
      awayScore: 1,
      player: '',
      dateTime: 15,
      card: "red",
    },
    {
      homeScore: 2,
      awayScore: 1,
      player: 'Adnan',
      dateTime: 16,
      card: "red",
    }
    ],
    updateMatch: mockUpdateMatch,
    finishMatch: mockFinishMatch,
  };

  test('renders match details correctly', () => {
    render(<Match {...matchData} />);

    const updateScoreElement = screen.getByText('Update');
    const finishMatchElement = screen.getByText('Finish Match');
    const scoreElement = screen.getByText('0-1');

    expect(updateScoreElement).toBeInTheDocument();
    expect(finishMatchElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });

  test('renders edit and delete buttons when updateMatch is true', () => {
    render(<Match {...matchData} />);

    const editButton = screen.getByText('Update');
    const finishButton = screen.getByText('Finish Match');

    expect(editButton).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
  });

  test('calls updateMatch with the correct arguments when update button is clicked', () => {
    render(<Match {...matchData} />);

    const editButton = screen.getByText('Update');
    fireEvent.click(editButton);

    expect(mockUpdateMatch).toHaveBeenCalled();
  });

  test('calls finishMatch with the correct argument when delete button is clicked', () => {
    render(<Match {...matchData} updateMatch />);

    const finishButton = screen.getByText('Finish Match');
    fireEvent.click(finishButton);

    expect(mockFinishMatch).toHaveBeenCalledWith(1);
  });

  test('renders goal history correctly', () => {
    render(<Match {...matchData} />);

    const playerCardElement = screen.getByText('red card to Adnan at 16');
    expect(playerCardElement).toBeInTheDocument();
  });

  test('renders match details correctly when goalHistory is empty', () => {
    const matchDataWithEmptyGoalHistory = { ...matchData, goalHistory: [] };
    render(<Match {...matchDataWithEmptyGoalHistory} />);

    const updateScoreElement = screen.getByText('Update');
    const finishMatchElement = screen.getByText('Finish Match');

    expect(updateScoreElement).toBeInTheDocument();
    expect(finishMatchElement).toBeInTheDocument();

    const scoreElement = screen.queryByText('0-1');

    expect(scoreElement).not.toBeInTheDocument(); // score should not be present
  });
});
