import { useState, useEffect } from 'react';
import { RankingData } from '../types';
import { ref, get, child } from 'firebase/database';
import addRankingToData from '../utils/addRankingToData';
import { db } from '../../firebase';

export default function useRanking() {
  const [ranking, setRanking] = useState<RankingData[]>();
  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, 'ranking'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const data = addRankingToData(rawData);
          setRanking(data);
        } else {
          setRanking([]);
        }
      })
      .catch(() => {
        setRanking([]);
      });
  }, []);

  return ranking;
}
