import styled from "styled-components";

const ProductSection = styled.section`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const ImageBox = styled.div`
  width: 600px;
  height: 600px;
  img {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }
`;

const CartBox = styled.div``;

const InfoBox = styled.div`
  margin-bottom: 138px;
`;

const SellerText = styled.p`
  font-size: 1.8rem;
  line-height: 2.3rem;
  color: #767676;
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

const ShiftText = styled.p`
  font-size: 1.6rem;
  color: #767676;
  &::after {
    margin: 20px auto 30px;
    display: block;
    content: "";
    height: 2px;
    background-color: #c4c4c4;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 14px;
`;

const TabSection = styled.section`
  margin: 140px auto 350px;
  display: flex;
  justify-content: center;
`;

const PriceBox = styled.div`
  &::before {
    margin: 30px auto 22px;
    display: block;
    content: "";
    height: 2px;
    background-color: #c4c4c4;
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
  color: #767676;
  span {
    font-weight: 700;
    color: #7e57c2;
  }
  &::after {
    margin: auto 12px auto 11px;
    display: inline-block;
    content: "";
    height: 18px;
    width: 1px;
    background-color: #c4c4c4;
    vertical-align: middle;
  }
`;

const PriceResultText = styled.p`
  font-weight: 700;
  font-size: 3.6rem;
  line-height: 4.5rem;
  color: #fa897b;
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
  ShiftText,
  ButtonBox,
  TabSection,
  PriceBox,
  PriceDescribeText,
  CountWrapBox,
  CountText,
  PriceResultText,
  CountBox,
};
