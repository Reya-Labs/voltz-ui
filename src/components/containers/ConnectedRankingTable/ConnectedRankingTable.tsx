import React, {useEffect, useState } from 'react';
import { SystemStyleObject, Theme } from '@theme';

import { Loading, Panel } from '@components/atomic';
import RankingTable from 'src/components/interface/RankingTable/RankingTable';
import useRanking from 'src/hooks/useRanking';
import { isUndefined } from 'lodash';
import { useWallet } from '@hooks';


export type ConnectedRankingTableProps = {
  handleInvite: () => void;
};

const ConnectedRankingTable: React.FunctionComponent<ConnectedRankingTableProps> = ({
  handleInvite
}) => {
  const wallet = useWallet();
  const { rankings } = useRanking(wallet);
  const { result, loading, call } = rankings;

  useEffect(() => {
    call();
  }, [call]);

  // useEffect(() => {
  //   if (result) {
  //     const sorted = getSortedRanking(result);
  //     setSortedRanking(sorted);
  //   }
  // }, [result]);

  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      paddingRight: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(2.5),
      paddingBottom: (theme) => theme.spacing(2.5),
      '&:first-of-type': {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      '&:last-of-type': {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
    '.MuiInputLabel-root': {
      marginBottom: (theme) => theme.spacing(1)
    },
  };

  const pages = 0;

  const renderContent = () => {
    if(!loading && result){
      return (
        <>
        <Panel variant='dark' padding='small' sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent' }}>
          <RankingTable ranking={result} handleInvite={handleInvite}/>
        </Panel>
        </>
      )
    } else{
      return (
        <>
        <Panel variant='grey-dashed' padding='small' sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent', marginBottom: '600px' }}>
          <Loading sx={{ margin: '0 auto' }} />
        </Panel>
        </>
        
      );
    }
  }

  return renderContent();
 
};

export default ConnectedRankingTable;

