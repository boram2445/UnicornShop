import styled from "styled-components";

//type large
const LargeBtn = styled.button<{ state?: string }>`
  width: 220px;
  padding: 19px 0;
  font-size: 2.4rem;
  line-height: 3rem;
  background-color: ${({ state }) => (state === "disabled" ? "#C4C4C4" : "#FA897B")};
  color: #ffffff;
  border-radius: 5px;
`;

// type medium
const MediumBtn = styled(LargeBtn)<{ color?: string }>`
  width: 480px;
  padding: 19px 0;
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
  width: 166px;
  padding: 17px 0;
`;

//type small
const SmallBtn = styled(MediumBtn)`
  width: 80px;
  padding: 10px 0;
`;

//type tabAcity
const TabAcityBtn = styled.button<{ state?: string }>`
  width: 320px;
  padding: 19px 0 12px;
  background-color: #ffffff;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: ${({ state }) => (state === "disabled" ? "#767676" : "#FA897B")};
  border-bottom: ${({ state }) => (state === "disabled" ? "#C4C4C4" : "#FA897B")} 6px solid;
`;

//type tabMenu
const TabMenuBtn = styled.button`
  width: 250px;
  padding: 15px 0;
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
