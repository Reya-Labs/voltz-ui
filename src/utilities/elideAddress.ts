const elideAddress = (address: string) => {
  const start = address.slice(0, 7);
  const end = address.slice(35);

  return `${start}...${end}`;
};

export default elideAddress;
