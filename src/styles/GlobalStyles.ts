'use client';

import { createGlobalStyle } from 'styled-components';
import { media } from './breakpoints';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  html, body {
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  body:has(.preview-popup) {
    overflow: hidden;
  }

  * {
    margin: 0;
    padding: 0;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  *:disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  button {
    border: 0;
    border-radius: 0;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  .h1, .h2, .h3, .h4, .h5, .h6 {
    color: inherit;
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  .container {
    width: 100%;
    padding: 0 30px;
    margin: 0 auto;

    ${media.md} {
      max-width: 750px;
      padding: 0 15px;
    }

    ${media.lg} {
      max-width: 970px;
    }

    ${media.xl} {
      max-width: 1170px;
    }
  }

  .text-center {
    text-align: center;
  }

  .col-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${media.md} {
      flex-direction: row;
    }
  }

  .container-body {
    text-align: center;

    ${media.md} {
      text-align: left;
    }
  }

  br {
    display: none;

    ${media.lg} {
      display: block;
    }
  }
`;

export default GlobalStyles;
