import styled from "styled-components";

const CircleCheckBtn = styled.input`
  appearance: none;
  display: block;
  height: 2rem;
  width: 2rem;
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 0.2rem solid #fa897b;
  cursor: pointer;
  &:after {
    content: "";
    height: 1.2rem;
    width: 1.2rem;
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
