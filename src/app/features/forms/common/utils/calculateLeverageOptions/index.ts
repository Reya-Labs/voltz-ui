import { roundIntegerNumber, stringToBigFloat } from '../../../../../../utilities/number';

export const calculateLeverageOptions = (maxLeverage: string) => {
  if (maxLeverage === '--') {
    return [0, 0, 0];
  }
  let maxLeverageOption = stringToBigFloat(maxLeverage);
  maxLeverageOption = roundIntegerNumber(
    maxLeverageOption,
    Math.max(
      0,
      Math.floor(maxLeverageOption.toString().length / 2) -
        1 +
        (maxLeverageOption.toString().length % 2),
    ),
  );
  return [
    Math.floor(maxLeverageOption / 4),
    Math.floor(maxLeverageOption / 2),
    Math.floor(maxLeverageOption),
  ];
};
