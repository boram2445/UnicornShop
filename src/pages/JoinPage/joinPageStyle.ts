import styled from "styled-components";
import { Logo } from "../LoginPage/loginPageStyle";
import { CheckBox } from "../../components/payment/FinalPayCheck/finalPayCheckStyle";

const JoinSection = styled.section`
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div:nth-child(3) {
    width: 480px;
    margin: 34px auto;
  }
`;

export { JoinSection, Logo, CheckBox };
