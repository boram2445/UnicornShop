import styled from "styled-components";
import { NoItemBox } from "../../common/Chart/chartStyle";

const OrderDoneSection = styled.section`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PresentImg = styled.img`
  margin-right: 1.5rem;
  width: 32rem;
`;

const InfoBox = styled(NoItemBox)`
  width: 30rem;
  margin-top: 1rem;
  text-align: center;
  p {
    font-size: 2.5rem;
  }
  small {
    font-size: 1.5rem;
    line-height: 2.5rem;
  }
`;

const BtnBox = styled.div`
  margin: 2rem 0 7rem 0;
  display: flex;
  gap: 3rem;
`;

export { OrderDoneSection, PresentImg, InfoBox, BtnBox };
