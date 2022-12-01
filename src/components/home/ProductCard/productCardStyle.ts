import styled from "styled-components";

const ProductItem = styled.li`
  cursor: pointer;
`;

const ThumbContainer = styled.div<{ image: string }>`
  padding-top: 100%;
  background: url(${({ image }) => image}) no-repeat center;
  background-size: cover;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
`;

const SellerText = styled.p`
  color: #767676;
  font-size: 1.6rem;
  line-height: 2.2rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const TextWrap = styled.div`
  margin-top: 10px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 22px;
`;

const PriceText = styled.strong`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3rem;
`;

const WonText = styled.span`
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 400;
`;

export { ProductItem, ThumbContainer, TextWrap, SellerText, ProductText, PriceText, WonText };
