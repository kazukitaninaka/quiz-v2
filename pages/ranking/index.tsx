import { useEffect, useState } from "react";
import { db } from "../../firebase";
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
} from "@material-ui/core";
import addRankingToData from "../../utils/addRankingToData";
import { RankingData } from "../../types";
import { child, get, ref } from "firebase/database";

export default function Ranking() {
  const [data, setData] = useState<RankingData[]>([]);
  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "data"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const data = addRankingToData(rawData);
          setData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <h2>Ranking Page</h2>
      {data.length === 0 ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ maxWidth: "15%", fontWeight: "bold" }}
                >
                  Rank
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((person) => {
                return (
                  <TableRow key={person.id}>
                    <TableCell align="center">{person.ranking}</TableCell>
                    <TableCell align="center">{person.name}</TableCell>
                    <TableCell align="center">{person.score}</TableCell>
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
