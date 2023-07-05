import styled from "styled-components";

const FinalPaySection = styled.section`
  width: 100%;
  max-width: 45rem;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3rem;
`;

const BoxWrap = styled.div`
  margin-top: 1.5rem;
  border: 0.2rem solid var(--color-main);
  border-radius: 1rem;
`;

const TopWrap = styled.div`
  padding: 1.9rem 3rem 2.5rem;
`;

const PayRow = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PayText = styled.p`
  font-size: 1.6rem;
  line-height: 2rem;
  text-align: start;
  width: 70px;
  &::before {
    margin-right: 0.4rem;
    display: inline-block;
    content: "";
    width: 0.5rem;
    height: 0.1rem;
    background-color: var(--color-black);
    vertical-align: middle;
  }
`;

const MoneyCount = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.2rem;
  text-align: end;
  span {
    margin-left: 0.4rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-darkGrey);
  }
`;

const TotalMoneyBox = styled(PayRow)`
  margin-top: 1.9rem;
  padding-top: 2.4rem;
  border-top: 0.1rem solid var(--color-grey);
`;

const TotalMoneyCount = styled.p`
  text-align: end;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3rem;
  color: var(--color-red);
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem 3rem 3.4rem;
  background-color: var(--color-brightGrey);
  border-radius: 0 0 1rem 1rem;
`;

const LabelBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  accent-color: var(--color-main);
`;

const LabelText = styled.label`
  margin-left: 1rem;
  font-size: 1.6rem;
  line-height: 2rem;
  cursor: pointer;
`;

export {
  FinalPaySection,
  Title,
  BoxWrap,
  TopWrap,
  PayRow,
  PayText,
  MoneyCount,
  TotalMoneyBox,
  TotalMoneyCount,
  BottomWrap,
  LabelBox,
  CheckBox,
  LabelText,
};
