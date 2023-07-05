import styled from "styled-components";
import { CartInfoBox as InfoBox } from "../../components/cart/CartInfo/cartInfoStyle";

const PaymentLayout = styled.main`
  margin: 3rem auto;
  padding: 0 30px;
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h2`
  margin: 5.4rem auto 5.2rem;
  text-align: center;
  font-weight: 700;
  font-size: 3.6rem;
  line-height: 4.4rem;
`;

const CartBox = styled.div`
  margin-bottom: 6rem;
`;

const CartInfoBox = styled(InfoBox)`
  margin-bottom: 0;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  gap: 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    strong:nth-child(n + 2) {
      display: none;
    }
  }
`;

const TotalPayText = styled.p`
  margin-top: 3rem;
  text-align: end;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  strong {
    margin-left: 1rem;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3rem;
    color: var(--color-red);
  }
`;

export { PaymentLayout, CartBox, TotalPayText, Title, CartInfoBox };
