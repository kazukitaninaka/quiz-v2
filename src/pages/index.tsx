import QuestionCard from '../components/QuestionCard';
import Start from '../components/Start';
import Result from '../components/Result';
import Loading from '../components/Loading';
import { Text } from '@chakra-ui/react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { isGameStartedState, questionNumState, quizDataState } from '../atoms';

export default function Home() {
  const isGameStarted = useRecoilValue(isGameStartedState);
  const quiz = useRecoilValueLoadable(quizDataState);
  const questionNum = useRecoilValue(questionNumState);

  if (!isGameStarted) {
    return <Start />;
  }
  if (questionNum - 1 >= 5) {
    return <Result />;
  }

  switch (quiz.state) {
    case 'hasValue':
      return <QuestionCard />;
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Text fontSize='2xl'>Error occured...</Text>;
  }
}
