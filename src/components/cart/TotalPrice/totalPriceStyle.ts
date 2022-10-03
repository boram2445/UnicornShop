import styled from "styled-components";

const TotalPriceBox = styled.div`
  margin: 80px auto 40px;
  padding: 44px 0 42px;
  width: 1280px;
  display: grid;
  grid-template-columns: 1fr 34px 1fr 34px 1fr 1fr;
  align-items: center;
  background-color: var(--color-brightGrey);
  border-radius: 5px;
`;

const PriceBox = styled.div`
  text-align: center;
`;

const TitleText = styled.p<{ type?: string }>`
  margin-bottom: 12px;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: ${({ type }) => (type ? "700" : "400")};
`;

const IconCircle = styled.span<{ icon: string }>`
  width: 34px;
  height: 34px;
  display: block;
  background: url(${({ icon }) => icon}) no-repeat center;
  background-color: var(--color-white);
  border-radius: 50%;
`;

const ResultText = styled.p`
  font-size: 2.4rem;
  line-height: 3rem;
  font-weight: 700;
  span {
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 400;
  }
`;

const FinalText = styled.strong`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4.5rem;
  color: var(--color-red);
  span {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.2rem;
  }
`;

export { TotalPriceBox, PriceBox, TitleText, IconCircle, ResultText, FinalText };
