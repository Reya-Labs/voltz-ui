import { useState } from 'react';
import uniqueId from 'lodash/uniqueId';

export const useUniqueId = () => {
  const [id] = useState(() => uniqueId());

  return id;
};
