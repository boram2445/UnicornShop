import styled from "styled-components";

const ErrorSection = styled.section`
  height: 100%;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 3.6rem;
  line-height: 4.4rem;
  font-weight: 700;
`;

const DescribeText = styled.p`
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-darkGrey);
`;

const BtnWrap = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 14px;
`;

export { ErrorSection, RightWrap, Title, DescribeText, BtnWrap };
