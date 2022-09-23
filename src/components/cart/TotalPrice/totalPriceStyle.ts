import styled from "styled-components";

const TotalPriceBox = styled.div`
  margin: 80px auto 40px;
  width: 1280px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: var(--color-brightGrey);
  border-radius: 5px;
`;

const PriceBox = styled.div`
  padding: 46px 0;
  text-align: center;
`;

const TitleText = styled.p`
  margin-bottom: 12px;
  font-size: 1.6rem;
  line-height: 2rem;
`;

const ResultText = styled.strong`
  font-size: 2.4rem;
  line-height: 3rem;
  font-weight: 700;
  span {
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 400;
  }
`;

export { TotalPriceBox, PriceBox, TitleText, ResultText };
