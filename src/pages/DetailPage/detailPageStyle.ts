import styled from "styled-components";

const ProductSection = styled.section`
  margin: 50px auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  gap: 50px;
`;

const ImageBox = styled.div`
  width: 100%;
  max-height: 600px;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CartBox = styled.div`
  width: 100%;
`;

const InfoBox = styled.div`
  margin-bottom: 138px;
`;

const SellerText = styled.a`
  font-size: 1.8rem;
  line-height: 2.3rem;
  color: var(--color-darkGrey);
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProductText = styled.strong`
  display: block;
  margin: 16px auto 20px;
  font-size: 3.6rem;
  line-height: 4.5rem;
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
    margin: 20px auto 30px;
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
  color: var(--color-red);
`;

const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
`;

const PriceBox = styled.div`
  &::before {
    margin: 30px auto 22px;
    display: block;
    content: "";
    height: 2px;
    background-color: var(--color-grey);
  }
`;

const PriceDescribeText = styled.p`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.3rem;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
`;

const CountWrapBox = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountText = styled.p`
  font-size: 1.8rem;
  line-height: 2.3rem;
  color: var(--color-darkGrey);
  span {
    font-weight: 700;
    color: var(--color-main);
  }
  &::after {
    margin: auto 12px auto 11px;
    display: inline-block;
    content: "";
    height: 18px;
    width: 1px;
    background-color: var(--color-grey);
    vertical-align: middle;
  }
`;

const PriceResultText = styled.p`
  font-weight: 700;
  font-size: 3.6rem;
  line-height: 4.5rem;
  color: var(--color-main);
  span {
    font-weight: 400;
    font-size: 18px;
    line-height: 2.3rem;
  }
`;

export {
  ProductSection,
  ImageBox,
  CartBox,
  InfoBox,
  SellerText,
  ProductText,
  PriceText,
  DetailWrap,
  DetailText,
  StockText,
  ButtonBox,
  PriceBox,
  PriceDescribeText,
  CountWrapBox,
  CountText,
  PriceResultText,
  CountBox,
};
