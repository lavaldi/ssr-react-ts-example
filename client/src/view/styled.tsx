import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font: 16px/1.5 Inconsolata, sans-serif;
    @media (min-width: 30rem) {
      font-size: 20px;
    }
  }
  body {
    color: #333;
    margin: 2rem 0 5rem;
    @media (min-width: 30rem) {
      margin-top: 5rem;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    color: #111;
    font-family: Montserrat, sans-serif;
    line-height: 1;
    margin: 0 0 0.5rem -0.1rem;
    text-rendering: optimizeLegibility;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  @media (min-width: 30rem) {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
`;