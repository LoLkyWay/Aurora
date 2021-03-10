import { deepCopy } from 'deep-copy-ts';

/* Party List Caching */
// const curDate = new Date();
// const rank = new Date(
//   curDate.getFullYear(),
//   curDate.getMonth(),
//   curDate.getDate(),
//   21,
//   0,
//   10
// );
// const teamFight = new Date(
//   curDate.getFullYear(),
//   curDate.getMonth(),
//   curDate.getDate(),
//   22,
//   0,
//   10
// );

interface partyStructureDTO {
  time: Date;
  user: string[];
};

export const partyStructure: partyStructureDTO = {
  time: new Date(),
  user: [],
};

export const party = {
  // '매일자랭': {
  //   ...deepCopy(partyStructure),
  //   time: rank,
  // },
  // '정기내전': {
  //   ...deepCopy(partyStructure),
  //   time: teamFight,
  // },
};
