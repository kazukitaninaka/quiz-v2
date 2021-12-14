import {
  Link,
  Box,
  // Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { PlayerData } from '../types';
import useRanking from '../hooks/useRanking';

type Props = {
  score: number;
  playerData: PlayerData;
};

const Result = ({ score, playerData }: Props) => {
  const ranking = useRanking();

  return (
    <div>
      <h2>Finished!</h2>
      <p>You scored {score} out of 5! Well done!</p>
      <h2>Ranking</h2>
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
      <Box mt={2}>
        <Link href='/' underline='always' style={{ marginRight: '16px', marginTop: '16px' }}>
          Go Back to Top
        </Link>
        <Link href='/ranking' underline='always'>
          Go to Ranking Page
        </Link>
      </Box>
    </div>
  );
};

export default Result;
