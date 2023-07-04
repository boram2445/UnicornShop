import styled from "styled-components";

const InfoBox = styled.div`
  margin-bottom: 12rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 5rem;
  }
`;

const SellerText = styled.p`
  font-size: 1.8rem;
  line-height: 2.3rem;
  color: var(--color-darkGrey);
`;

const ProductText = styled.div`
  margin: 1.5rem auto;
  display: flex;
  align-items: center;
  strong {
    display: block;
    font-size: 3.6rem;
    line-height: 4.5rem;
  }
  div {
    margin-left: 0.8rem;
    position: relative;
  }
`;

const PriceText = styled.p`
  font-size: 3.6rem;
  line-height: 4.5rem;
  font-weight: 700;
  span {
    font-size: 1.8rem;
    line-height: 2.3rem;
  }
`;

const DetailWrap = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &::after {
    margin: 2rem auto 3rem;
    display: block;
    content: "";
    height: 2px;
    background-color: var(--color-grey);
  }
`;

const DetailText = styled.p`
  font-size: 1.6rem;
  color: var(--color-darkGrey);
`;

const StockText = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-red);
`;

export { InfoBox, SellerText, ProductText, PriceText, DetailWrap, DetailText, StockText };
