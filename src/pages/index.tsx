import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import Start from '../components/Start';
import Result from '../components/Result';
import { db } from '../../firebase';
import { PlayerData } from '../types';
import { ref, set } from 'firebase/database';
import useQuizData from '../hooks/useQuizData';
import { Center, CircularProgress, Text } from '@chakra-ui/react';

export default function Home() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<PlayerData>({
    id: null,
    name: '',
  });
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const { quiz, isLoading, isError } = useQuizData(gameStarted);

  const startGame = () => {
    setGameStarted(true);
    setQuestionNum(1);
  };

  const finishGame = () => {
    // send score to db
    set(ref(db, `ranking/${playerData.id}`), {
      name: playerData.name,
      id: playerData.id,
      score,
    });
    // finish game
    setQuestionNum((prev) => prev + 1);
  };

  if (!gameStarted) {
    return (
      <Start startGame={startGame} setPlayerData={setPlayerData} playersName={playerData.name} />
    );
  }

  if (isLoading) {
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if (isError) {
    return <Text>Error occured...</Text>;
  }

  if (questionNum - 1 >= quiz!.length) {
    return <Result score={score} playerData={playerData} />;
  }

  return (
    <QuestionCard
      questionData={quiz[questionNum - 1]}
      questionNum={questionNum}
      setScore={setScore}
      setQuestionNum={setQuestionNum}
      finishGame={finishGame}
    />
  );
}
