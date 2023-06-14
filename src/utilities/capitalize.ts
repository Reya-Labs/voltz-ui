export const capitalize = (str: string, lowerRest: boolean = false) => {
  return str[0].toUpperCase() + (lowerRest ? str.substring(1).toLowerCase() : str.substring(1));
};
