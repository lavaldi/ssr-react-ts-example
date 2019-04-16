import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPostsList, getIsFetching } from '../state/selector';
import { fetchPosts } from '../state/actions';
import { PostModel } from '../models/PostModel';
import { Post } from './post';

interface Props {
  isFetching: boolean;
  postsList?: PostModel[];
  fetchData?: Function;
}

class PostsList extends Component<Props>{
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { isFetching, postsList } = this.props;
    if (isFetching) {
      return <p>...</p>
    }
    return (
      <React.Fragment>
        {
          postsList.length > 0 &&
          postsList.map(post => <Post key={post.id} id={post.id} body={post.body} title={post.title} />)
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  postsList: getPostsList(state),
  isFetching: getIsFetching(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchPosts())
});

export function loadData(store) {
  const actionsToBeDispatched = [];
  actionsToBeDispatched.push(store.dispatch(fetchPosts()));

  return Promise.all(actionsToBeDispatched);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
