import styled from "styled-components";

const FinalPaySection = styled.section`
  width: 480px;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3rem;
`;

const BoxWrap = styled.div`
  margin-top: 15px;
  border: 2px solid var(--color-main);
  border-radius: 10px;
`;

const TopWrap = styled.div`
  padding: 19px 30px 25px;
`;

const PayRow = styled.div`
  margin-top: 12px;
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
    margin-right: 4px;
    display: inline-block;
    content: "";
    width: 5px;
    height: 1px;
    background-color: var(--color-black);
    vertical-align: middle;
  }
`;

const MoneyCount = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.2rem;
  width: 350px;
  text-align: end;
  span {
    margin-left: 4px;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-darkGrey);
  }
`;

const TotalMoneyBox = styled(PayRow)`
  margin-top: 19px;
  padding-top: 24px;
  width: 416px;
  border-top: 1px solid var(--color-grey);
`;

const TotalMoneyCount = styled.p`
  width: 350px;
  text-align: end;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3rem;
  color: var(--color-red);
`;

const BottomWrap = styled.div`
  padding: 30px 30px 34px;
  background-color: var(--color-brightGrey);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border-radius: 0 0 10px 10px;
`;

const LabelBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  height: 16px;
  width: 16px;
  border-radius: 5px;
  cursor: pointer;
  accent-color: var(--color-main);
`;

const LabelText = styled.label`
  margin-left: 10px;
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
