import React from "react";
import {createGlobalStyle} from "styled-components";

import Landing from "../sections/landing";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

const IndexPage = () => (
  <>
    <GlobalStyle />

    <Landing />
  </>
);

export default IndexPage;
