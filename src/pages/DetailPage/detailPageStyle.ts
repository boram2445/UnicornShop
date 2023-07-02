import styled from "styled-components";
import { ThumbContainer } from "../../components/home/ProductCard/productCardStyle";

const DetailSection = styled.main`
  margin: 5rem auto;
  padding: 0 3rem;
  max-width: 120rem;
`;

const ProductWrap = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled(ThumbContainer)`
  width: 100%;
  padding-top: 0;
`;

const InfoBox = styled.div`
  margin-bottom: 10rem;
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
  color: var(--color-red);
`;

const ButtonWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
`;

const PriceBox = styled.div`
  &::before {
    margin: 3rem auto 2.2rem;
    display: block;
    content: "";
    height: 0.2rem;
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
  margin-bottom: 3rem;
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
    height: 2rem;
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
    margin-left: 1rem;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.3rem;
    color: var(--color-black);
  }
`;

export {
  DetailSection,
  ProductWrap,
  ImageBox,
  InfoBox,
  SellerText,
  ProductText,
  PriceText,
  DetailWrap,
  DetailText,
  StockText,
  ButtonWrap,
  PriceBox,
  PriceDescribeText,
  CountWrapBox,
  CountText,
  PriceResultText,
  CountBox,
};
