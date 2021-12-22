export type PlayerData = {
  id: number;
  name: string;
} | null;

export type QuizData = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizInfo = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

export type UserAnswerStatus = 'correct' | 'incorrect' | 'notAnsweredYet';

export type RankingData = {
  id: number;
  name: string;
  score: number;
  ranking: number;
};

const fetchedQuizData = {
  response_code: 0,
  results: [
    {
      category: 'General%20Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'Where%20is%20the%20train%20station%20%22Llanfair%C2%ADpwllgwyngyll%C2%ADgogery%C2%ADchwyrn%C2%ADdrobwll%C2%ADllan%C2%ADtysilio%C2%ADgogo%C2%ADgoch%22%3F',
      correct_answer: 'Wales',
      incorrect_answers: ['Moldova', 'Czech%20Republic', 'Denmark'],
    },
    {
      category: 'General%20Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'What%20is%20on%20display%20in%20the%20Madame%20Tussaud%27s%20museum%20in%20London%3F',
      correct_answer: 'Wax%20sculptures',
      incorrect_answers: ['Designer%20clothing', 'Unreleased%20film%20reels', 'Vintage%20cars'],
    },
    {
      category: 'General%20Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'Foie%20gras%20is%20a%20French%20delicacy%20typically%20made%20from%20what%20part%20of%20a%20duck%20or%20goose%3F',
      correct_answer: 'Liver',
      incorrect_answers: ['Heart', 'Stomach', 'Intestines'],
    },
    {
      category: 'General%20Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which%20of%20the%20following%20is%20not%20an%20Ivy%20League%20University%3F',
      correct_answer: 'Stanford',
      incorrect_answers: ['University%20of%20Pennsylvania', 'Harvard', 'Princeton'],
    },
    {
      category: 'General%20Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What%20is%20the%20French%20word%20for%20%22fish%22%3F',
      correct_answer: 'poisson',
      incorrect_answers: ['fiche', 'escargot', 'mer'],
    },
  ],
};

export type FetchedQuizData = typeof fetchedQuizData;
