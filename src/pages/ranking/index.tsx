import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { Text } from '@chakra-ui/react';
import useRanking from '../../hooks/useRanking';

export default function Ranking() {
  const ranking = useRanking();
  return (
    <>
      <Text fontSize='3xl'>Ranking Page</Text>
      {!ranking ? (
        <Box textAlign='center'>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='left' style={{ maxWidth: '15%', fontWeight: 'bold' }}>
                  Rank
                </TableCell>
                <TableCell align='left' style={{ fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align='left' style={{ fontWeight: 'bold' }}>
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking.map((person) => {
                return (
                  <TableRow key={person.id}>
                    <TableCell align='center'>{person.ranking}</TableCell>
                    <TableCell align='center'>{person.name}</TableCell>
                    <TableCell align='center'>{person.score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
