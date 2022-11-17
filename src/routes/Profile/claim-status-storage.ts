export const setToStorage = (id: ClaimStatusStorageId) => {
  localStorage.setItem(id, 'true');
};

export const getFromStorage = (id: ClaimStatusStorageId) => {
  return localStorage.getItem(id);
};

export const deleteFromStorage = (id: ClaimStatusStorageId) => {
  localStorage.removeItem(id);
};

type ClaimStatusStorageId = string;
export const getId = (account: string, badgeType: string): ClaimStatusStorageId => {
  return `${account}#${badgeType}`;
};
