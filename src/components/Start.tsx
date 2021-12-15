import React, { Dispatch, SetStateAction } from 'react';
import { PlayerData } from '../types';
import { Heading, Input, Button, Flex, Text } from '@chakra-ui/react';

type Props = {
  startGame: () => void;
  setPlayerData: Dispatch<SetStateAction<PlayerData>>;
  playersName: string;
};

export default function Start({ startGame, setPlayerData, playersName }: Props) {
  // Enabling pressing enter to start game
  function handleStartGame(e: React.KeyboardEvent<HTMLDivElement>) {
    if (playersName !== '' && e.key === 'Enter') {
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
            value={playersName}
            onKeyPress={handleStartGame}
          />
          <Button
            color='white'
            bgColor='teal.400'
            _hover={{ bgColor: 'teal.500' }}
            onClick={startGame}
            disabled={playersName === ''}
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
