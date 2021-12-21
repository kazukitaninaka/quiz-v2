import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import Start from '../components/Start';
import Result from '../components/Result';
import Loading from '../components/Loading';
import { db } from '../../firebase';
import { PlayerData } from '../types';
import { ref, set } from 'firebase/database';
import { Text } from '@chakra-ui/react';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState, useRecoilState } from 'recoil';
import { isGameStartedState, questionNumState, quizDataQuery } from '../atoms';

export default function Home() {
  const [playerData, setPlayerData] = useState<PlayerData>({
    id: null,
    name: '',
  });
  const [score, setScore] = useState<number>(0);

  const isGameStarted = useRecoilValue(isGameStartedState);
  const setIsGameStarted = useSetRecoilState(isGameStartedState);
  const quiz = useRecoilValueLoadable(quizDataQuery);
  const [questionNum, setQuestionNum] = useRecoilState(questionNumState);

  function startGame() {
    // setGameStarted(true);
    setIsGameStarted(true);
    setQuestionNum(1);
  }

  function finishGame() {
    // send score to db
    set(ref(db, `ranking/${playerData.id}`), {
      name: playerData.name,
      id: playerData.id,
      score,
    });
    // finish game
    setQuestionNum((prev: number) => prev + 1);
  }

  if (!isGameStarted) {
    return (
      <Start startGame={startGame} setPlayerData={setPlayerData} playersName={playerData.name} />
    );
  }
  if (questionNum - 1 >= quiz.contents.length) {
    return <Result score={score} playerData={playerData} />;
  }

  switch (quiz.state) {
    case 'hasValue':
      return (
        <QuestionCard
          questionNum={questionNum}
          setScore={setScore}
          setQuestionNum={setQuestionNum}
          finishGame={finishGame}
        />
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Text fontSize='2xl'>Error occured...</Text>;
  }

  // if (isLoading) {
  //   return <Loading />;
  // }
  // if (isError) {
  //   return <Text fontSize='2xl'>Error occured...</Text>;
  // }

  // return (
  //   <QuestionCard
  //     questionData={quiz![questionNum - 1]}
  //     questionNum={questionNum}
  //     setScore={setScore}
  //     setQuestionNum={setQuestionNum}
  //     finishGame={finishGame}
  //   />
  // );
}
