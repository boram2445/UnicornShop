import styled from "styled-components";

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

export { PriceBox, PriceDescribeText, CountBox, CountWrapBox, CountText, PriceResultText };
