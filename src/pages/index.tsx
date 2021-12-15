import { useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import QuestionCard from '../components/QuestionCard';
import Start from '../components/Start';
import Result from '../components/Result';
import { db } from '../../firebase';
import shuffleArray from '../utils/shuffle';
import { PlayerData, QuizData, QuizInfo } from '../types';
import { ref, set } from 'firebase/database';
import useQuizData from '../hooks/useQuizData';

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

  let content;
  if (!gameStarted && !score) {
    content = (
      <Start startGame={startGame} setPlayerData={setPlayerData} playersName={playerData.name} />
    );
  } else if (isError) {
    content = <div>error</div>;
  } else if (isLoading || !quiz) {
    content = (
      <Box textAlign='center'>
        <CircularProgress />
      </Box>
    );
  } else if (questionNum - 1 >= quiz.length) {
    content = <Result score={score} playerData={playerData} />;
  } else {
    content = (
      <QuestionCard
        questionData={quiz[questionNum - 1]}
        questionNum={questionNum}
        setScore={setScore}
        setQuestionNum={setQuestionNum}
        finishGame={finishGame}
      />
    );
  }
  return <>{content}</>;
}
