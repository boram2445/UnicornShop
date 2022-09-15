import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    /* color */
    --color-main:#FA897B;
    --color-white:#FFFFFF;
    --color-yellow: #FFF8E1;
    --color-red:#EB5757;
    --color-brightGrey:#F2F2F2;
    --color-grey:#C4C4C4;
    --color-darkGrey:#767676;
    --color-black:#000000;
    --color-brightPink:#ffebee;
  }

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
    color:inherit;
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
