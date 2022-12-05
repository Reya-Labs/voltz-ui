import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useUniqueId = () => {
  const [id] = useState(() => uuidv4());

  return id;
};
