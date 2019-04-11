import * as actionTypes from './actionTypes';
import { servicePosts } from './services';

const fetchPostsListRequest = () => ({
  type: actionTypes.FETCH_POSTS_REQUEST
});

const fetchPostsListSuccess = (data) => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  data
});

const fetchPostsListFailure = (error) => ({
  type: actionTypes.FETCH_POSTS_FAILURE,
  error
});

// thunk

export const fetchPosts = () => {
  return async dispatch => {
    dispatch(fetchPostsListRequest())
    try {
      const data = await servicePosts.getData();
      dispatch(fetchPostsListSuccess(data));
    } catch (error) {
      dispatch(fetchPostsListFailure(error));
    }
  }
}