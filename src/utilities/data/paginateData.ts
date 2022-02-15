import { TableData } from './types';

export type PaginateDataArgs = {
  data: TableData[];
  page: number;
  size: number;
};

export type PaginateDataResult = {
  data: TableData[];
  pages: number;
};

const paginateData = ({ data, page }: PaginateDataArgs): PaginateDataResult => {
  return {
    data,
    pages: 0,
  };
};

export default paginateData;
