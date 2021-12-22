import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isGameStartedState, playerDataState, questionNumState } from '../atoms';

export default function Start() {
  const setIsGameStarted = useSetRecoilState(isGameStartedState);
  const setQuestionNum = useSetRecoilState(questionNumState);
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
          <Input
            variant='flushed'
            placeholder='Your name'
            w='30%'
            onChange={(e) => setPlayerData({ id: Date.now(), name: e.target.value })}
            required
            value={playerData?.name}
            onKeyPress={handleStartGame}
          />
          <Button
            color='white'
            bgColor='teal.400'
            _hover={{ bgColor: 'teal.500' }}
            onClick={startGame}
            disabled={!playerData?.name}
            w='20%'
            mt={3}
          >
            Start
          </Button>
        </Flex>
      </form>
    </div>
  );
}
