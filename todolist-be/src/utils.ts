import { Query } from './interfaces';

export function paginationHandler(query: Query) {
  const defaultPageNum = 1;
  const defaultLimitVal = 10;
  let page = parseInt(query.page, 10) || defaultPageNum;
  let limit = parseInt(query.limit, 10) || defaultLimitVal;
  page = page < 1 ? 1 : page;
  limit = limit < 1 ? 10 : limit;
  const skip = (page - 1) * limit;
  return { skip, limit };
}
