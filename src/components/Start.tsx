import React, { Dispatch, SetStateAction } from 'react';
import { PlayerData } from '../types';
import { Heading, Input, Button, Flex, Text } from '@chakra-ui/react';

type Props = {
  startGame: () => void;
  setPlayerData: Dispatch<SetStateAction<PlayerData>>;
  playersName: string;
};

const Start = ({ startGame, setPlayerData, playersName }: Props) => {
  // Enabling pressing enter to start game
  const handleStartGame = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (playersName !== '' && e.key === 'Enter') {
      startGame();
    }
  };
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
            colorScheme='blue'
            variant='solid'
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
};

export default Start;
