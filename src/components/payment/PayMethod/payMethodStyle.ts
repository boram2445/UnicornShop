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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
