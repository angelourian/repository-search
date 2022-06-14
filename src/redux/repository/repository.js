import {
  FETCH_REPOSITORY
} from './index';

import {
  SUCCESS,
  ERROR,
  PENDING
} from '../../constants/status';

const initialState = {
  isFetchingError: false,
  isFetching: false,
  repositories: [],
  totalCount: 0,
  filters: {
    perPage: 25,
    currentPage: 0,
    search: ''
  }
};

const repositoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_REPOSITORY + PENDING: 
      return {
        ...state,
        isFetching: true,
        isFetchingError: false
      }
    case FETCH_REPOSITORY + ERROR: 
      return {
        ...state,
        isFetching: false,
        isFetchingError: true
      }
    case FETCH_REPOSITORY + SUCCESS: 
      return {
        ...state,
        repositories: action.payload.items,
        totalCount: action.payload.totalCount,
        filters: {
          perPage: action.payload.perPage,
          currentPage: action.payload.currentPage,
          search: action.payload.search
        },
        isFetching: false,
        isFetchingError: false
      };
    default: return state;
  }
}

export default repositoryReducer;
