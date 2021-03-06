import React, { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentQuizInfo, playerDataState, questionNumState, scoreState } from '../atoms';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';

const defaultStyle = {
  color: 'teal.400',
  bgColor: 'white',
  borderColor: 'teal.400',
  border: '2px',
  _hover: { bgColor: 'teal.50' },
};
const correctAnswerStyle = {
  color: 'white',
  bgColor: 'teal.400',
};
const incorrectAnswerStyle = {
  color: 'white',
  bgColor: 'red.400',
};
type ButtonStyle = typeof correctAnswerStyle | typeof incorrectAnswerStyle | typeof defaultStyle;

export default function QuestionCard() {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const questionData = useRecoilValue(currentQuizInfo);
  const [questionNum, setQuestionNum] = useRecoilState(questionNumState);
  const playerData = useRecoilValue(playerDataState);
  const [score, setScore] = useRecoilState(scoreState);

  function onAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    setIsAnswered(true);
    const userAnswer = e.currentTarget.value;
    setUserAnswer(userAnswer);
    const isCorrect = questionData.correct_answer === userAnswer;
    setIsCorrect(isCorrect);

    if (isCorrect) setScore((prev) => prev + 1);
  }

  function goNextQuestion() {
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuestionNum((prev) => prev + 1);
  }

  function finishGame() {
    // send score to db
    set(ref(db, `ranking/${playerData!.id}`), {
      name: playerData!.name,
      id: playerData!.id,
      score,
    });
    // finish game
    setQuestionNum((prev: number) => prev + 1);
  }

  return (
    <>
      <Text mt={2}>Question {questionNum}/5</Text>
      <Text my={2} fontSize='xl'>
        {decodeURIComponent(questionData.question)}
      </Text>
      {questionData.answers.map((answer, index) => {
        const isCorrectAnswer = answer === questionData.correct_answer;
        const isUserAnswer = answer === userAnswer;
        let buttonStyle: ButtonStyle;
        let emoji: '?????????????' | '?????????????' | null = null;
        if (isAnswered && isCorrectAnswer) {
          buttonStyle = correctAnswerStyle;
          emoji = '?????????????';
        } else if (!isCorrect && isUserAnswer) {
          buttonStyle = incorrectAnswerStyle;
          emoji = '?????????????';
        } else {
          buttonStyle = defaultStyle;
        }
        return (
          <Button
            key={`answer-${index}`}
            pointerEvents={isAnswered ? 'none' : 'auto'}
            w='full'
            value={answer}
            onClick={onAnswer}
            my={1}
            {...buttonStyle}
          >
            {decodeURIComponent(answer)} {emoji}
          </Button>
        );
      })}
      {!isAnswered ? null : isCorrect ? (
        <Text fontWeight='bold' fontSize='lg' my={2}>
          ???? Correct!
        </Text>
      ) : (
        <Text fontWeight='bold' fontSize='lg' my={2}>
          ???? Incorrect...
        </Text>
      )}
      {!isAnswered ? null : questionNum === 5 ? (
        <Button
          color='white'
          bgColor='teal.400'
          _hover={{ bgColor: 'teal.500' }}
          onClick={finishGame}
        >
          Result
        </Button>
      ) : (
        <Button
          color='white'
          bgColor='teal.400'
          _hover={{ bgColor: 'teal.500' }}
          onClick={goNextQuestion}
        >
          Next Question
        </Button>
      )}
    </>
  );
}
