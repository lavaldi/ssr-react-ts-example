import * as actionTypes from './actionTypes';
import { PostModel } from '../models/PostModel';

interface State {
  data: PostModel[];
  isFetching: boolean;
  error: boolean;
}

const initialState: State = {
  data: [],
  isFetching: true,
  error: false
};

export const postsList = (state: State = initialState, action): State => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        data: action.data,
        isFetching: false,
        error: false
      }

    case actionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    default:
      return state;
  }
}