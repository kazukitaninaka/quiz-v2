import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../../src/pages/index';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import {
  isGameStartedState,
  playerDataState,
  questionNumState,
  quizDataState,
  scoreState,
} from '../../src/atoms';

const results = [
  {
    category: 'General%20Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'Which%20best%20selling%20toy%20of%201983%20caused%20hysteria%2C%20resulting%20in%20riots%20breaking%20out%20in%20stores%3F',
    correct_answer: 'Cabbage%20Patch%20Kids',
    incorrect_answers: ['Transformers', 'Care%20Bears', 'Rubik%E2%80%99s%20Cube'],
    answers: ['Transformers', 'Care%20Bears', 'Rubik%E2%80%99s%20Cube', 'Cabbage%20Patch%20Kids'],
  },
  {
    category: 'General%20Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What%20word%20represents%20the%20letter%20%27T%27%20in%20the%20NATO%20phonetic%20alphabet%3F',
    correct_answer: 'Tango',
    incorrect_answers: ['Target', 'Taxi', 'Turkey'],
    answers: ['Target', 'Taxi', 'Turkey', 'Tango'],
  },
  {
    category: 'General%20Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What%20is%20%22dabbing%22%3F',
    correct_answer: 'A%20dance',
    incorrect_answers: ['A%20medical%20procedure', 'A%20sport', 'A%20language'],
    answers: ['A%20medical%20procedure', 'A%20sport', 'A%20language', 'A%20dance'],
  },
  {
    category: 'General%20Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What%20is%20the%20name%20of%20Poland%20in%20Polish%3F',
    correct_answer: 'Polska',
    incorrect_answers: ['Pupcia', 'Polszka', 'P%C3%B3land'],
    answers: ['Pupcia', 'Polszka', 'P%C3%B3land', 'Polska'],
  },
  {
    category: 'General%20Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What%20are%20Panama%20hats%20made%20out%20of%3F',
    correct_answer: 'Straw',
    incorrect_answers: ['Silk', 'Hemp', 'Flax'],
    answers: ['Silk', 'Hemp', 'Flax', 'Straw'],
  },
];

describe('Home', () => {
  it('renders Start.tsx', () => {
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders QuestionCard.tsx (progress bar)', async () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(isGameStartedState, true);
          snap.set(questionNumState, 1);
        }}
      >
        <Home />
      </RecoilRoot>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders actual question', async () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(isGameStartedState, true);
          snap.set(questionNumState, 1);
          snap.set(quizDataState, results);
        }}
      >
        <Home />
      </RecoilRoot>,
    );
    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons.length).toBe(4);
  });

  it('shows next question button when answered', async () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(isGameStartedState, true);
          snap.set(questionNumState, 1);
          snap.set(quizDataState, results);
        }}
      >
        <Home />
      </RecoilRoot>,
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('goes next question when next question button is clicked', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(isGameStartedState, true);
          snap.set(questionNumState, 1);
          snap.set(quizDataState, results);
        }}
      >
        <Home />
      </RecoilRoot>,
    );
    fireEvent.click(screen.getAllByRole('button')[0]); // click one of the answer buttons
    fireEvent.click(screen.getByText('Next Question')); // click next question button

    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons.length).toBe(4);
    expect(screen.getByText('Question 2/5')).toBeInTheDocument();
  });

  it('renders Ranking.tsx when complete all questions', async () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(isGameStartedState, true);
          snap.set(questionNumState, 5);
          snap.set(quizDataState, results);
          snap.set(playerDataState, { id: 12345678, name: '山田' });
          snap.set(scoreState, 3);
        }}
      >
        <Home />
      </RecoilRoot>,
    );
    fireEvent.click(screen.getAllByRole('button')[0]); // click one of the answer buttons
    fireEvent.click(screen.getByText('Result')); // click result button

    expect(screen.getByText('Ranking')).toBeInTheDocument();

    await waitFor(() => screen.getByRole('table'));
    expect(screen.getByRole('table')).toBeInTheDocument(); // make sure ranking table is successfully rendered
  });
});
