import { useEffect, useState } from 'react';
import { FetchedQuizData, QuizInfo } from '../types';
import shuffleArray from '../utils/shuffle';

export default function useQuizData(shouldFetch: boolean) {
  const [quiz, setQuiz] = useState<QuizInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function fetchQuiz(): Promise<FetchedQuizData> {
    return fetch(
      'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986',
    ).then((res) => res.json());
  }

  useEffect(() => {
    if (!shouldFetch) return;
    setIsLoading(true);
    fetchQuiz()
      .then((data) => {
        const quizData = data.results.map((quiz) => ({
          ...quiz,
          answers: shuffleArray([...quiz.incorrect_answers, quiz.correct_answer]),
        }));
        setQuiz(quizData);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setQuiz([]);
    };
  }, [shouldFetch]);

  return {
    quiz,
    isLoading,
    isError,
  };
}
