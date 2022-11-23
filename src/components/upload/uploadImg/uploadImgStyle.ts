import styled from "styled-components";

const Label = styled.label`
  color: var(--color-darkGrey);
  font-size: 1.6rem;
  line-height: 2rem;
`;

const ImageBox = styled.div<{ image?: string }>`
  margin-top: 10px;
  position: relative;
  width: 300px;
  height: 300px;
  background-color: ${({ image }) => !image && "#C4C4C4"};
  border: 1px solid var(--color-grey);
  cursor: pointer;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    opacity: ${({ image }) => !image && "0.9"};
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageBtn = styled.button<{ image?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ image }) => (image ? "none" : "block")};
  width: 50px;
  height: 50px;
  background-color: var(--color-darkGrey);
  border-radius: 50%;
`;

export { Label, ImageBox, ImageInput, ImageBtn };
