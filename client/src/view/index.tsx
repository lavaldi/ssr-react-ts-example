import React, { Component } from 'react';
import { GlobalStyle, Container, Title } from './styled';
import { PostsListFeature } from './postsList';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Title>Blog Posts</Title>
          <PostsListFeature />
        </Container>
        <GlobalStyle />
      </React.Fragment>
    )
  }
}