import { atom, selector } from 'recoil';
import { FetchedQuizData, PlayerData } from './types';
import shuffleArray from './utils/shuffle';

export const isGameStartedState = atom<boolean>({
  key: 'isGameStartedState',
  default: false,
});

export const questionNumState = atom<number>({
  key: 'questionNumState',
  default: 0,
});

// return info of only question 1 if the player is dealing with question 1.
export const currentQuizInfo = selector({
  key: 'currentQuizInfo',
  get: ({ get }) => {
    return get(quizDataState)![get(questionNumState) - 1];
  },
});

export const scoreState = atom<number>({
  key: 'scoreState',
  default: 0,
});

export const playerDataState = atom<PlayerData>({
  key: 'playerData',
  default: {
    id: null,
    name: '',
  },
});

async function fetchQuiz(): Promise<FetchedQuizData> {
  return fetch(
    'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986',
  ).then((res) => res.json());
}
export const quizDataQuery = selector({
  key: 'quizData',
  get: async ({ get }) => {
    if (!get(isGameStartedState)) return;
    const data = await fetchQuiz();
    const quizData = data.results.map((quiz) => ({
      ...quiz,
      answers: shuffleArray([...quiz.incorrect_answers, quiz.correct_answer]),
    }));
    return quizData || [];
  },
});

// convert selector to atom due to simplicity of testing
export const quizDataState = atom({
  key: 'quizDataState',
  default: quizDataQuery,
});
