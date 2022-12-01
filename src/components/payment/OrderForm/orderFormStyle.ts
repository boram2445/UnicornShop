import styled from "styled-components";

const Title = styled.h3`
  padding-bottom: 8px;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 3rem;
  border-bottom: 2px solid var(--color-grey);
`;

const ErrorText = styled.small`
  margin-left: 10px;
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-red);
`;

const SectionTitle = styled.h4`
  margin-top: 40px;
  padding-bottom: 8px;
  text-align: start;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.3rem;
  border-bottom: 2px solid var(--color-grey);
  button {
    margin-left: 20px;
  }
`;

const LabelText = styled.strong`
  text-align: start;
  font-size: 1.6rem;
  line-height: 4.5rem;
`;

const Row = styled.div`
  padding: 4px 0 4px;
  display: grid;
  grid-template-columns: 170px auto;
  border-bottom: 1px solid var(--color-grey);
`;

const Input = styled.input<{ width?: string; maxWidth?: string; minWidth?: string }>`
  margin: 4px auto;
  padding: 0 8px;
  height: 40px;
  width: ${({ width }) => width || "334px"};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  font-size: 1.6rem;
  border: 1px solid var(--color-grey);
  outline-color: var(--color-brightPink);
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
  margin-left: 10px;
`;

const BottomWrap = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export { Title, ErrorText, SectionTitle, LabelText, Row, Input, BtnWrapper, BottomWrap };
