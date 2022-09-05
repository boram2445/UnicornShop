import styled from "styled-components";

//type large
const LargeBtn = styled.button<{ state?: string }>`
  padding: 19px 87px;
  font-size: 2.4rem;
  line-height: 3rem;
  background-color: ${({ state }) => (state === "disabled" ? "#C4C4C4" : "#FA897B")};
  color: #ffffff;
  border-radius: 5px;
`;

// type medium
const MediumBtn = styled(LargeBtn)<{ color?: string }>`
  padding: 19px 223px;
  font-size: 1.8rem;
  line-height: 2.2rem;
  background-color: ${({ color, state }) =>
    (color === "white" && "#ffffff") ||
    (color === "dark" && "#767676") ||
    (state === "disabled" && "#C4C4C4") ||
    "#FA897B"};
  border: ${({ color }) => color === "white" && "#C4C4C4 1px solid"};
  color: ${({ color }) => (color === "white" ? "#767676" : "#ffffff")};
  &:hover {
    color: ${({ color }) => (color === "white" ? "#000000" : "#ffffff")};
    border: ${({ color }) => (color === "white" ? "#000000" : "none")} 1px solid;
  }
`;

// type ms
const MsBtn = styled(MediumBtn)`
  padding: 17px 68px;
`;

//type small
const SmallBtn = styled(MediumBtn)`
  padding: 10px 25px;
`;

//type tabAcity
const TabAcityBtn = styled.button<{ state?: string }>`
  padding: 19px 142px 12px;
  background-color: #ffffff;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: ${({ state }) => (state === "disabled" ? "#C4C4C4" : "#FA897B")};
  border-bottom: ${({ state }) =>
    state === "disabled" ? "#C4C4C4 6px solid" : "#FA897B 6px solid"};
`;

//type tabMenu
const TabMenuBtn = styled.button`
  padding: 15px 20px;
  font-size: 1.6rem;
  line-height: 2rem;
  background-color: #ffffff;
  border-radius: 5px;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 77px;
    color: #ffffff;
    background-color: #eb5757;
    border-radius: 50%;
  }
  &:hover {
    background-color: #ffebee;
  }
`;

export { LargeBtn, MediumBtn, MsBtn, SmallBtn, TabAcityBtn, TabMenuBtn };
