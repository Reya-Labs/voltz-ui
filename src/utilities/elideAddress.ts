/**
 *
 * @param address
 */
/**
 * It takes a string, slices off the first 6 characters, slices off the last 4 characters, and returns the result
 * @param {string} address - The address to elide.
 * @returns A function that takes an address and returns a string that is the first 6 characters of the address, followed
 * by 3 dots, followed by the last 4 characters of the address.
 */
const elideAddress = (address: string) => {
  const start = address.slice(0, 6);
  const end = address.slice(38, 42);

  return `${start}...${end}`;
};

export default elideAddress;
