/**
 * It checks whether a character is an ASCII letter or not.
 */
export const isASCIILeter = (char: string): boolean => {
  if (char.length !== 1) {
    return false;
  }
  const asciiCode = char.charCodeAt(0);
  return (asciiCode >= 65 && asciiCode < 91) || (asciiCode >= 97 && asciiCode < 123);
};
