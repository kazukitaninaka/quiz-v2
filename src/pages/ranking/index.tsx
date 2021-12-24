import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import useRanking from '../../hooks/useRanking';
import Loading from '../../components/Loading';

export default function Ranking() {
  const ranking = useRanking();
  return (
    <>
      <Text fontSize='3xl' my={5}>
        Ranking Page
      </Text>
      {!ranking.length ? (
        <Loading />
      ) : (
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Name</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ranking.map((person) => {
              return (
                <Tr key={person.id}>
                  <Td>{person.ranking}</Td>
                  <Td>{person.name}</Td>
                  <Td>{person.score} pts</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </>
  );
}
