import { Input, Button, Flex, Text, Select } from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isGameStartedState,
  playerDataState,
  questionNumState,
  selectedGenreState,
} from '../atoms';

export default function Start() {
  const setIsGameStarted = useSetRecoilState(isGameStartedState);
  const setQuestionNum = useSetRecoilState(questionNumState);
  const setGenreNum = useSetRecoilState(selectedGenreState);
  const [playerData, setPlayerData] = useRecoilState(playerDataState);

  function startGame() {
    setIsGameStarted(true);
    setQuestionNum(1);
  }
  // Enabling pressing enter to start game
  function handleStartGame(e: React.KeyboardEvent<HTMLDivElement>) {
    if (playerData?.name && e.key === 'Enter') {
      startGame();
    }
  }
  return (
    <div>
      <Text fontSize='3xl' my={5}>
        Easy Quiz Game!
      </Text>
      <form>
        <Flex direction='column'>
          <Text as='i' mb={3}>
            Choose a genre.
          </Text>
          <Select
            variant='outline'
            w='40%'
            mb={4}
            onChange={(e) => setGenreNum(parseInt(e.target.value))}
          >
            <option value='9'>General Knowledge</option>
            <option value='18'>Computer Science</option>
          </Select>
          <Text as='i' mb={3}>
            Enter your name.
          </Text>
          <Input
            variant='flushed'
            placeholder='Your name'
            w='30%'
            onChange={(e) => setPlayerData({ id: Date.now(), name: e.target.value })}
            required
            value={playerData?.name}
            onKeyPress={handleStartGame}
            mb={4}
          />
          <Button
            color='white'
            bgColor='teal.400'
            _hover={{ bgColor: 'teal.500' }}
            onClick={startGame}
            disabled={!playerData?.name}
            w='20%'
          >
            Start
          </Button>
        </Flex>
      </form>
    </div>
  );
}
