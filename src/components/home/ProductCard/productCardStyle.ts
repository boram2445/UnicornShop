import styled from "styled-components";

const ProductItem = styled.li`
  cursor: pointer;
`;

const ThumbContainer = styled.div`
  margin-bottom: 16px;
  width: 380px;
  height: 380px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 380px;
  object-fit: cover;
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

const ProductText = styled.p`
  margin: 10px 0;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 22px;
`;

const PriceText = styled.strong`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3rem;
`;

const WordWon = styled.span`
  font-size: 1.6rem;
  line-height: 2rem;
`;

export { ProductItem, ThumbContainer, ThumbImg, SellerText, ProductText, PriceText, WordWon };
