import uniqueId from 'lodash/uniqueId';
import { useState } from 'react';

export const useUniqueId = () => {
  const [id] = useState(() => uniqueId());

  return id;
};
