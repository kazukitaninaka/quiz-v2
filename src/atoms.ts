import { atom, RecoilValue, selector } from 'recoil';
import { FetchedQuizData, QuizInfo } from './types';
import shuffleArray from './utils/shuffle';

export const isGameStartedState = atom<boolean>({
  key: 'isGameStartedState',
  default: false,
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
    return quizData;
  },
});
