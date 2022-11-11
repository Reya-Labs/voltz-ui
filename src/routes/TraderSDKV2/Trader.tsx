import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation, useSearchParams } from 'react-router-dom';

import { AugmentedAMM, setPageTitle } from '@utilities';
import { Agents } from '@contexts';
import { PageTitleDesc } from '@components/composite';
import { useAgent, useWallet } from '@hooks';
import { Page, SwapFormModes } from '@components/interface';
import ConnectedAMMTable from './ConnectedAMMTable/ConnectedAMMTable';
import { getRenderMode } from './services';
import { Protocol, Position } from '@voltz-protocol/v2-sdk';
import { ethers } from 'ethers';

const Trader: React.FunctionComponent = () => {
  const [formMode, setFormMode] = useState<SwapFormModes>();
  // const [amm, setAMM] = useState<AugmentedAMM>();
  // const [settling, setSettling] = useState<boolean>(false);
  // const [position, setPosition] = useState<Position>();

  // 1. build protocol object with the env. variable and trigger onLand() initializer (and remove useAmms())
  // at this moment, all AMMs are loaded
  // 2. add an useEffect when signer is connected and trigger onConnect(signer) (and remove usePositions())
  // protocol.positions (:Position[]) will be filled onConnect()
  const [protocol, setProtocol] = React.useState<Protocol>(null);
  useEffect(() => {
    const protocol = new Protocol({
      factoryAddress: process.env.REACT_APP_FACTORY_ADDRESS || '',
      provider: new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '',
      ),
      lpWhitelistedAmms: (process.env.REACT_APP_LP_ONLY_WHITELIST || '')
        .split(',')
        .map((s) => s.trim().toLowerCase()),
      traderWhitelistedAmms: (process.env.REACT_APP_WHITELIST || '')
        .split(',')
        .map((s) => s.trim().toLowerCase()),
      graphEndpoint: process.env.REACT_APP_SUBGRAPH_URL || '',
      coingeckoApiKey: process.env.REACT_APP_COINGECKO_API_KEY || '',
    });
    protocol.onLand().then(() => setProtocol(protocol));
  }, []);

  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();
  // remove both for v2 (if agent is FIXED_TAKER or VARIABLE_TAKER, then get protocol.getTraderPositions(), otherwise protocol.getLPPositions())
  // const { positions, positionsByAgentGroup } = usePositions();
  const { agent } = useAgent();
  const { account } = useWallet();

  const pathnameWithoutPrefix = pathname.slice(1);
  const renderMode = getRenderMode(formMode, pathnameWithoutPrefix);

  useEffect(() => {
    setFormMode(undefined);
    // setAMM(undefined);
    onChangeAgent(Agents.FIXED_TRADER);
  }, [setFormMode, pathnameWithoutPrefix, onChangeAgent]);

  const referrerKey = 'invitedBy';
  const [searchParams] = useSearchParams();
  if (!!searchParams.get(referrerKey) && !localStorage.getItem(referrerKey)) {
    // Referrer is set in URL and has not already been saved in storage; save to storage now
    // We do deliberately do not overwrite any existing value because we want to credit the first referral link that was followed
    localStorage.setItem('invitedBy', searchParams.get('invitedBy') || '');
  }

  useEffect(() => {
    handleReset();
  }, [key]);

  const handleCompletedSettling = () => {
    // setSettling(!settling);
  };

  useEffect(() => {
    switch (renderMode) {
      case 'pools': {
        setPageTitle('Trader Pools', account);
        break;
      }
      case 'portfolio': {
        setPageTitle('Trader Portfolio', account);
        break;
      }
      case 'form': {
        setPageTitle(`${false ? 'Edit' : 'New'} Trader Position`, account);
        break;
      }
    }
  }, [setPageTitle, renderMode]);

  const handleSelectAmm = (selectedAMM: AugmentedAMM) => {
    setFormMode(SwapFormModes.NEW_POSITION);
    // setAMM(selectedAMM);
    // setPosition(findCurrentPosition(positions || [], selectedAMM, [1, 2]));
  };
  const handleSelectPosition = (
    selectedPosition: Position,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    // Please note that you will never get 'liquidity' mode here as that is only for LP positions.
    let newMode = SwapFormModes.EDIT_MARGIN;
    if (mode === 'rollover') newMode = SwapFormModes.ROLLOVER;
    if (mode === 'notional') newMode = SwapFormModes.EDIT_NOTIONAL;

    setFormMode(newMode);
    // setAMM(
    //   mode === 'rollover'
    //     ? findCurrentAmm(amms || [], selectedPosition)
    //     : (selectedPosition.amm as AugmentedAMM),
    // );
    // setPosition(selectedPosition);
  };
  const handleReset = () => {
    setFormMode(undefined);
    //setAMM(undefined);
    //setPosition(undefined);
  };

  return (
    <Page>
      {renderMode === 'pools' && protocol && (
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc
              title="Trade Fixed or Variable Rates"
              desc="Choose a pool and decide whether to trade fixed or variable rates."
            />
          </Box>
          <ConnectedAMMTable protocol={protocol} onSelectItem={handleSelectAmm} />
        </Box>
      )}

      {/*{settling && renderMode === 'portfolio' && (*/}
      {/*  <PortfolioProvider*/}
      {/*    positions={agent !== Agents.LIQUIDITY_PROVIDER ? undefined : undefined}*/}
      {/*  >*/}
      {/*    <ConnectedPositionTable*/}
      {/*      onSelectItem={handleSelectPosition}*/}
      {/*      agent={Agents.FIXED_TRADER}*/}
      {/*      handleCompletedSettling={handleCompletedSettling}*/}
      {/*    />*/}
      {/*  </PortfolioProvider>*/}
      {/*)}*/}

      {/*{!settling && renderMode === 'portfolio' && (*/}
      {/*  <PortfolioProvider*/}
      {/*    positions={agent !== Agents.LIQUIDITY_PROVIDER ? positionsByAgentGroup : undefined}*/}
      {/*  >*/}
      {/*    <ConnectedPositionTable*/}
      {/*      onSelectItem={handleSelectPosition}*/}
      {/*      agent={Agents.FIXED_TRADER}*/}
      {/*      handleCompletedSettling={handleCompletedSettling}*/}
      {/*    />*/}
      {/*  </PortfolioProvider>*/}
      {/*)}*/}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          {/*{amm && (*/}
          {/*  <AMMProvider amm={amm}>*/}
          {/*    <PositionProvider position={position}>*/}
          {/*      <SwapFormProvider*/}
          {/*        mode={formMode}*/}
          {/*        defaultValues={{*/}
          {/*          notional: formMode === SwapFormModes.EDIT_NOTIONAL ? 0 : undefined,*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        <ConnectedSwapForm onReset={handleReset} />*/}
          {/*      </SwapFormProvider>*/}
          {/*    </PositionProvider>*/}
          {/*  </AMMProvider>*/}
          {/*)}*/}
        </Box>
      )}
    </Page>
  );
};

export default Trader;
