import { deepCopy } from 'deep-copy-ts';

/* Party List Caching */
export const partyStructure = {
  time: new Date(),
  user: [],
};

export const party = {
  '내전': {
    ...deepCopy(partyStructure)
  }
};
