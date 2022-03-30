export const extractErrorMessage = (error: any): string | null => {
  if (!error) {
    return null;
  }

  if (!error.message && !error.data.message) {
    return null;
  }

  if (error.data.message) {
    return error.data.message.toString();
  }

  if (error.message) {
    return error.message.toString();
  }

  return null;
};

export const getError = (message: string): string => {
  if (message.includes('LOK')) {
    return 'The pool has not been initialized yet';
  }

  if (message.includes('CanOnlyTradeIfUnlocked')) {
    return 'The pool has not been initialized yet';
  }

  if (message.includes('closeToOrBeyondMaturity')) {
    return 'The pool is close to or beyond maturity';
  }

  if (message.includes('TLU')) {
    return 'Lower Fixed Rate must be smaller than Upper Fixed Rate!';
  }

  if (message.includes('TLM')) {
    return 'Lower Fixed Rate is too low!';
  }

  if (message.includes('TUM')) {
    return 'Upper Fixed Rate is too high!';
  }

  if (message.includes('only sender or approved integration')) {
    return 'No approval to act on this address behalf';
  }

  if (message.includes('MS or ME')) {
    return 'No approval to act on this address behalf';
  }

  if (message.includes('only msg.sender or approved can mint')) {
    return 'No approval to act on this address behalf';
  }

  if (message.includes('E<=S')) {
    return 'Internal error: The timestamps of the pool are not correct';
  }

  if (message.includes('B.T<S')) {
    return 'Internal error: Operations need current timestamp to be before maturity';
  }

  if (message.includes('endTime must be >= currentTime')) {
    return 'Internal error: Operations need current timestamp to be before maturity';
  }

  if (message.includes('parameters not set')) {
    return 'Internal error: Margin Calculator parameters not set';
  }

   if (message.includes('SPL')) {
    return 'No notional available in that direction';
  }

  if (message.includes('MarginRequirementNotMet')) {
    return 'No enough margin for this operation';
  }

  if (message.includes('NP')) {
    return 'Active positions should have positive liquidity';
  }

  if (message.includes('LO')) {
    return 'Internal Error: Liquidity exceeds maximum amount per tick';
  }

  if (message.includes('not enough liquidity to burn')) {
    return 'Not enough liquidity to burn';
  }

  if (message.includes('PositionNotSettled')) {
    return 'The position needs to be settled first';
  }

  if (message.includes('WithdrawalExceedsCurrentMargin')) {
    return 'No enough margin to withdraw';
  }

  if (message.includes('MarginLessThanMinimum')) {
    return 'No enough margin for this operation';
  }

  if (message.includes('InvalidMarginDelta')) {
    return 'Amount of notional must be greater than 0!';
  }

  if (message.includes('LiquidityDeltaMustBePositiveInMint')) {
    return 'Internal error: Liquidity for mint should be positive';
  }

  if (message.includes('LiquidityDeltaMustBePositiveInBurn')) {
    return 'Internal error: Liquidity for burn should be positive';
  }

  if (message.includes('IRSNotionalAmountSpecifiedMustBeNonZero')) {
    return 'Amount of notional must be greater than 0!';
  }

  if (message.includes('tick must be properly spaced')) {
    return 'Internal error: Ticks must be properly spaced!';
  }

  if (message.includes('TSOFLOW')) {
    return 'Internal error: Timestamp overflows';
  }

  if (message.includes('already settled')) {
    return 'Position already settled';
  }

  if (message.includes('from > to')) {
    return 'Internal error: Rates disorder when getting rate in the rate oracle';
  }

  if (message.includes('Misordered dates')) {
    return 'Internal error: Rates disorder when getting apy in the rate oracle';
  }

  if (message.includes('UNITS')) {
    return 'Internal error: Timestamps not initialized when getting variable factor';
  }

  if (message.includes('>216')) {
    return 'Internal error: Observation overflows in the rate oracle';
  }

  if (message.includes('New size of oracle buffer should be positive')) {
    return 'New size of oracle buffer should be positive';
  }

  if (message.includes('OLD')) {
    return 'Internal error: Oracle buffer overflows';
  }

  if (message.includes('x must be > 0')) {
    return 'Internal error: the value must be positive in BitMath';
  }

  if (message.includes('SafeMath: addition overflow')) {
    return 'Internal error: addition overflow';
  }

  if (message.includes('SafeMath: subtraction overflow')) {
    return 'Internal error: subtraction overflow';
  }

  if (message.includes('SafeMath: multiplication overflow')) {
    return 'Internal error: multiplication overflow';
  }

  if (message.includes('ERC20: transfer from the zero address')) {
    return 'Internal error: ERC20: transfer from the zero address';
  }

  if (message.includes('ERC20: transfer to the zero address')) {
    return 'Internal error: ERC20: transfer to the zero address';
  }

  if (message.includes('ERC20: transfer amount exceeds balance')) {
    return 'ERC20: transfer amount exceeds balance';
  }

  if (message.includes('ERC20: mint to the zero address')) {
    return 'ERC20: mint to the zero address';
  }

  if (message.includes('ERC20: burn from the zero address')) {
    return 'ERC20: burn from the zero address';
  }

  if (message.includes('ERC20: burn amount exceeds balance')) {
    return 'ERC20: burn amount exceeds balance';
  }

  if (message.includes('ERC20: approve from the zero address')) {
    return 'ERC20: approve from the zero address';
  }

  if (message.includes('ERC20: approve to the zero address')) {
    return 'ERC20: approve to the zero address';
  }

  if (message.includes('CT_CALLER_MUST_BE_LENDING_POOL')) {
    return 'Internal error: Caller must lending pool';
  }
  
  if (message.includes('CT_INVALID_MINT_AMOUNT')) {
    return 'Internal error: Invalid aToken amount to mint';
  }

  if (message.includes('CT_INVALID_BURN_AMOUNT')) {
    return 'Internal error: Invalid aToken amount to burn';
  }

  if (message.includes('Division by zero')) {
    return 'Internal error: Division by zero in aToken';
  }

  if (message.includes('overflow')) {
    return 'Internal error: Overflow in aToken';
  }

  if (message.includes('overflow in toUint160')) {
    return 'Internal error: Overflow when casting to Uint160';
  }

  if (message.includes('overflow in toInt128')) {
    return 'Internal error: Overflow when casting to Int128';
  }

  if (message.includes('overflow in toInt256')) {
    return 'Internal error: Overflow when casting to Int256';
  }

  if (message.includes('denominator underflows')) {
    return 'Internal error: Denominator underflows in SqrtPriceMath';
  }

  if (message.includes('starting px must be > quotient')) {
    return 'Internal error: Next price should be higher than current price in SqrtPriceMath';
  }

  if (message.includes('starting price must be > 0')) {
    return 'Internal error: Starting price not initialized in SqrtPriceMath';
  }

  if (message.includes('liquidity must be > 0')) {
    return 'Internal error: Liquidity must be positive in tick range';
  }

  if (message.includes('tick outside of range')) {
    return 'Internal error: Tick outside of range in TickMath';
  }

  if (message.includes('price outside of range')) {
    return 'Internal error: Price outside of range in TickMath';
  }

  if (message.includes('Wad Ray Math: 49')) {
    return 'Internal error: addition overflow in WadRayMath';
  }

  if (message.includes('Wad Ray Math: 50')) {
    return 'Internal error: division by zero in WadRayMath';
  }

  return 'Unrecognized error';
};
