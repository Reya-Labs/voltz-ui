import React from 'react';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';

import { AddressBox, PointsBox, Rank } from './components';
import { RankType } from 'src/utilities/data/rankingData';

export type RankingTableRowProps = {
  ranking: RankType[];
  page: number;
};

// todo: panel component, adjust the styling
const RankingTableRow: React.FunctionComponent<RankingTableRowProps> = ({ ranking, page }) => {
  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
    return {
      backgroundColor: `#262040`, // this affects the colour of the Pool table rows
      borderRadius: '10px',
    };
  };

  const renderTable = () => {
    const labels = ['rank', 'trader', 'points'];
    return (
      <>
        {ranking.map((rank, index) => {
          if (index < page * 10 || index >= page * 10 + 10) {
            return <></>;
          }
          return (
            <TableRow sx={{ ...typeStyleOverrides() }}>
              {labels.map((label) => {
                if (label === 'rank') {
                  return <Rank points={index + 1} />;
                }
                if (label === 'points') {
                  return <PointsBox points={rank.points} />;
                }
                if (label === 'trader') {
                  return <AddressBox address={rank.address}></AddressBox>;
                }
                return null;
              })}
            </TableRow>
          );
        })}
      </>
    );
  };

  return <>{renderTable()}</>;
};

export default RankingTableRow;
