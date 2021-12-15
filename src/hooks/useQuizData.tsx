import useSWRImmutable from 'swr/immutable';
import { FetchedQuizData } from '../types';
import shuffleArray from '../utils/shuffle';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useQuizData(shouldFetch: boolean) {
  const { data, error } = useSWRImmutable<FetchedQuizData>(
    shouldFetch
      ? 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986'
      : null,
    fetcher,
  );

  const quizData = data?.results.map((quiz) => ({
    ...quiz,
    answers: shuffleArray([...quiz.incorrect_answers, quiz.correct_answer]),
  }));

  return {
    quiz: quizData,
    isLoading: !error && !data,
    isError: error,
  };
}