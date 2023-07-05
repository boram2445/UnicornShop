import styled from "styled-components";

const Title = styled.h3`
  padding-bottom: 0.8rem;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 3rem;
  border-bottom: 0.2rem solid var(--color-grey);
`;

const ErrorText = styled.small`
  margin-left: 1rem;
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-red);
`;

const SectionTitle = styled.h4`
  margin-top: 4rem;
  padding-bottom: 0.8rem;
  text-align: start;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.3rem;
  border-bottom: 0.2rem solid var(--color-grey);
  button {
    margin-left: 2rem;
  }
`;

const LabelText = styled.strong`
  text-align: start;
  font-size: 1.6rem;
  line-height: 4.5rem;
`;

const Row = styled.div`
  padding: 0.4rem 0.5rem 0.4rem;
  display: grid;
  grid-template-columns: 17rem auto;
  align-items: center;
  border-bottom: 0.1rem solid var(--color-grey);

  @media screen and (max-width: 768px) {
    grid-template-columns: 10rem auto;
  }
`;

const Input = styled.input<{ width?: string; maxWidth?: string }>`
  margin: 0.4rem auto;
  padding: 0 0.8rem;
  height: 4rem;
  width: ${({ width }) => width || "33.4rem"};
  max-width: ${({ maxWidth }) => maxWidth};
  font-size: 1.6rem;
  border: 1px solid var(--color-grey);
  ~ small {
    display: none;
  }
  &:invalid {
    outline-color: var(--color-red);
    ~ small {
      display: inline-block;
    }
  }
`;

const BtnWrapper = styled.div`
  display: inline-block;
  margin-left: 1rem;
`;

const BottomWrap = styled.div`
  margin-top: 7rem;
  display: flex;
  justify-content: space-between;
  gap: 4rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export { Title, ErrorText, SectionTitle, LabelText, Row, Input, BtnWrapper, BottomWrap };
