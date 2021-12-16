import { Table, Thead, Tbody, Tr, Th, Td, Text, Link, Flex } from '@chakra-ui/react';
import { PlayerData } from '../types';
import useRanking from '../hooks/useRanking';

type Props = {
  score: number;
  playerData: PlayerData;
};

export default function Result({ score, playerData }: Props) {
  const ranking = useRanking();

  return (
    <div>
      <Text fontSize='3xl' mt={5}>
        Finished!
      </Text>
      <Text>You scored {score} out of 5! Well done!</Text>
      <Text fontSize='3xl' mt={5}>
        Ranking
      </Text>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ranking &&
            ranking.map((person) => {
              const isYou = person.id === playerData.id;
              return (
                <Tr key={person.id}>
                  <Td fontWeight={isYou ? 'bold' : 'normal'}>{person.ranking}</Td>
                  <Td fontWeight={isYou ? 'bold' : 'normal'}>
                    {person.name} {isYou && '(You)'}
                  </Td>
                  <Td fontWeight={isYou ? 'bold' : 'normal'}>{person.score} pts</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Flex mt={5} gap={5}>
        <Link href='/' color='teal.500' textDecoration='underline'>
          Go Back to Top
        </Link>
        <Link href='/ranking' color='teal.500' textDecoration='underline'>
          Go to Ranking Page
        </Link>
      </Flex>
    </div>
  );
}
