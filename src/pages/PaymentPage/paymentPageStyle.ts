import styled from "styled-components";
import { CartInfoBox as InfoBox } from "../CartPage/cartPageStyle";

const PaymentSection = styled.section`
  margin: 30px auto;
  padding: 0 30px;
  width: 100%;
  max-width: 1280px;
`;

const Title = styled.h2`
  margin: 54px auto 52px;
  text-align: center;
  font-weight: 700;
  font-size: 3.6rem;
  line-height: 4.4rem;
`;

const CartBox = styled.div`
  margin-bottom: 60px;
`;

const CartInfoBox = styled(InfoBox)`
  margin-bottom: 0;
  padding-left: 8px;
  padding-right: 8px;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  gap: 0;
`;

const TotalPayText = styled.p`
  margin-top: 30px;
  text-align: end;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  strong {
    margin-left: 10px;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3rem;
    color: var(--color-red);
  }
`;

export { PaymentSection, CartBox, TotalPayText, Title, CartInfoBox };
