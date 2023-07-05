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
  margin-top: 1.8rem;
  padding: 1.8rem 0 1.8rem 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border-top: 0.2rem solid var(--color-grey);
  border-bottom: 0.2rem solid var(--color-grey);
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  line-height: 2rem;
  cursor: pointer;
`;

const CircleInput = styled(CircleCheckBtn)`
  margin: 0;
  position: static;
  transform: translateY(0);
  border-color: var(--color-grey);
  &:checked {
    border-color: var(--color-main);
  }
`;

export { PayMentSection, PayMentBox, InputWrap, Title, Label, CircleInput };
