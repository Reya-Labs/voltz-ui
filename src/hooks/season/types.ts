type SEASON_IDS = 0 | 1 | 2 | 3 | 4 | 5;

export type Season = {
  id: SEASON_IDS;
  label: string;
  shortName: string;
  startDate: number;
  endDate: number;
  claimingEnabled: boolean;
};
