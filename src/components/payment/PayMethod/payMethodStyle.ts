import styled from "styled-components";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtnStyle";

const PayMentSection = styled.section`
  width: 780px;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3rem;
`;

const PayMentBox = styled.div`
  margin-top: 18px;
  padding: 18px 0 18px 12px;
  border-top: 2px solid var(--color-grey);
  border-bottom: 2px solid var(--color-grey);
`;

const InputWrap = styled.span`
  position: relative;
`;

const Label = styled.label`
  margin: 0 20px 0 30px;
  font-size: 1.6rem;
  line-height: 2rem;
  cursor: pointer;
`;

const CircleInput = styled(CircleCheckBtn)`
  border-color: var(--color-grey);
  left: 0;
  top: 2px;
  &:checked {
    border-color: var(--color-main);
  }
`;

export { PayMentSection, PayMentBox, InputWrap, Title, Label, CircleInput };
