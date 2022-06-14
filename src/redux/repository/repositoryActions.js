import {
  FETCH_REPOSITORY
} from './index';
import {
  SUCCESS,
  ERROR,
  PENDING
} from '../../constants/status';
import {
  get
} from '../../utils/api';
// import isEmpty from '../../utils/isEmpty';

export const actionFetchRepository = (filterRepo, perPage = 25, currentPage = 0) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REPOSITORY + PENDING });
    const { total_count, items } = await get(`/search/repositories?q=${filterRepo}&per_page=${perPage}&page=${currentPage + 1}`, 'items');
    dispatch({
      type: FETCH_REPOSITORY + SUCCESS,
      payload:
      {
        items: items,
        perPage,
        currentPage: currentPage + 1,
        search: filterRepo,
        totalCount: total_count
      }
    });
  } catch (e) {
    dispatch({ type: FETCH_REPOSITORY + ERROR });
  }
};

