import styled from "styled-components";

const Title = styled.h3`
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 3rem;
  &:after {
    margin-top: 18px;
    display: block;
    content: "";
    width: 1280px;
    height: 2px;
    background-color: var(--color-grey);
  }
`;

const Caption = styled.caption`
  margin-top: 40px;
  text-align: start;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.3rem;
  &:after {
    margin-top: 8px;
    display: block;
    content: "";
    width: 1280px;
    height: 2px;
    background-color: var(--color-grey);
  }
`;

const LabelText = styled.th`
  text-align: start;
  font-size: 1.6rem;
  line-height: 4.5rem;
`;

const Row = styled.tr`
  padding-top: 4px;
  display: grid;
  grid-template-columns: 170px auto;
  &:after {
    margin-top: 4px;
    display: block;
    content: "";
    width: 1280px;
    height: 1px;
    background-color: var(--color-grey);
  }
`;

const Input = styled.input<{ width?: string }>`
  margin: 4px auto;
  padding: 0 8px;
  height: 40px;
  width: ${({ width }) => width || "334px"};
  font-size: 1.6rem;
  border: 1px solid var(--color-grey);
  outline-color: var(--color-brightPink);
  ~ span {
    display: none;
  }
  &:invalid {
    ~ span {
      display: inline-block;
    }
  }
`;

const BtnWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

export { Title, Caption, LabelText, Row, Input, BtnWrapper };
