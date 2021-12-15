import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@chakra-ui/react';
import { QuizInfo } from '../types';

type Props = {
  questionData: QuizInfo;
  setQuestionNum: Dispatch<SetStateAction<number>>;
  handleAfterAnswering: (correct: boolean) => void;
  questionNum: number;
  finishGame: () => void;
};
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

const QuestionCard = ({
  questionData,
  handleAfterAnswering,
  setQuestionNum,
  questionNum,
  finishGame,
}: Props) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAnswered(true);
    const userAnswer = e.currentTarget.value;
    setUserAnswer(userAnswer);
    const isCorrect = questionData.correct_answer === userAnswer;
    setIsCorrect(isCorrect);

    handleAfterAnswering(isCorrect);
  };

  const goNextQuestion = () => {
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuestionNum((prev) => prev + 1);
  };

  return (
    <>
      <p>Q{questionNum}/5</p>
      <h3>{decodeURIComponent(questionData.question)}</h3>
      {questionData.answers.map((answer, index) => {
        const isCorrectAnswer = answer === questionData.correct_answer;
        const isUserAnswer = answer === userAnswer;
        let buttonStyle, emoji;
        if (isAnswered && isCorrectAnswer) {
          buttonStyle = correctAnswerStyle;
          emoji = '🙆‍♂️';
        } else if (!isCorrect && isUserAnswer) {
          buttonStyle = incorrectAnswerStyle;
          emoji = '🙅‍♀️';
        } else {
          buttonStyle = defaultStyle;
        }
        return (
          <Button
            key={`answer-${index}`}
            pointerEvents={isAnswered ? 'none' : 'auto'}
            w='full'
            value={answer}
            onClick={checkAnswer}
            my={1}
            {...buttonStyle}
          >
            {decodeURIComponent(answer)} {emoji}
          </Button>
        );
      })}
      {!isAnswered ? null : isCorrect ? <h3>🎉Correct!</h3> : <h3>😭Incorrect...</h3>}
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
};

export default QuestionCard;
