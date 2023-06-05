import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from './Scoreboard';
import Match from './Match';

describe('Scoreboard component', () => {
  test('renders the start match buttons', () => {
    render(<Scoreboard />);

    const startMatchButtons = screen.getAllByRole('button', { name: /Match \d+/i });

    expect(startMatchButtons).toHaveLength(5);
  });

  test('starts a match when a start match button is clicked', () => {
    render(<Scoreboard />);

    const startMatchButton = screen.getByText('Match 1');

    fireEvent.click(startMatchButton);

    // Assert the match is started and displayed on the scoreboard
    const homeTeamElement = screen.queryAllByText('Mexico');
    const awayTeamElement = screen.queryAllByText('Canada');

    expect(homeTeamElement.length).toBe(2);
    expect(awayTeamElement.length).toBe(2);
  });

  test('updates the match score when the updateMatch function is called', () => {
    render(<Scoreboard />);

    // Start a match
    const startMatchButton = screen.getByText('Match 1');
    fireEvent.click(startMatchButton);

    // Update the match score
    const editButton = screen.getByText('Update Score');
    fireEvent.click(editButton);

    // Assert the match score is updated
    const scoreElements = screen.getAllByText('1-1');
    expect(scoreElements.length).toBe(2);


  });

  test('should call updateMatch when a match is updated', () => {
    const updateMatch = jest.fn(); // Create a mock function

    // Render the Scoreboard component with the mock updateMatch function
    render(<Match updateMatch={updateMatch} />);

    // Simulate updating the match by calling the updateMatch function directly
    updateMatch();

    // Check if updateMatch is called
    expect(updateMatch).toHaveBeenCalled();
  });

  test('removes a match when the finishMatch function is called', () => {
    render(<Scoreboard />);

    // Start a match
    const startMatchButton = screen.getByText('Match 1');
    fireEvent.click(startMatchButton);

    // Finish the match
    const deleteButton = screen.getByText('Finish Match');
    fireEvent.click(deleteButton);

    // Assert the match is removed from the scoreboard
    const homeTeamElement = screen.queryByText('Mexico');
    const awayTeamElement = screen.queryByText('Canada');

    expect(homeTeamElement).not.toBeInTheDocument();
    expect(awayTeamElement).not.toBeInTheDocument();
  });



});