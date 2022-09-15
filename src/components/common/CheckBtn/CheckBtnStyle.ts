import styled from "styled-components";

const CircleCheckBtn = styled.input`
  appearance: none;
  height: 20px;
  width: 20px;
  display: block;
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 2px solid #fa897b;
  cursor: pointer;
  &:after {
    content: "";
    height: 12px;
    width: 12px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: #fa897b;
    border-radius: 50%;
    transition: 100ms ease-in-out 0s;
  }
  &:checked {
    &:after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export { CircleCheckBtn };
