import { useState } from 'react';
import uniqueId from 'lodash/uniqueId';

const useUniqueId = () => {
  const [id] = useState(() => uniqueId());

  return id;
};

export default useUniqueId;
