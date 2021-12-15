import { RankingData } from '../types';

function compare(a: RankingData, b: RankingData) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}

export default compare;
