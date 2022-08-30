import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
  }

  html, button, input{
    font-size: 10px;
    font-family: SpoqaHanSansNeo, sans-serif;
  } 

  button{
    padding:0;
    background:transparent; 
    border:none; 
    cursor: pointer;
  }

  a{
    text-decoration:none; 
  }

  .ir {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
  }
`;

export default GlobalStyle;
