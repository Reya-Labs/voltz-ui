const elideAddress = (address: string) => {
  const start = address.slice(0, 6);
  const end = address.slice(38);

  return `${start}...${end}`;
};

export default elideAddress;
