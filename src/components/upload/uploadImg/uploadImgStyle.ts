import styled, { css } from "styled-components";
import ImgIcon from "../../../assets/icons/icon-image.svg";

const Label = styled.label`
  color: var(--color-darkGrey);
  font-size: 1.6rem;
  line-height: 2rem;
`;

const ImageBox = styled.div<{ previewUrl?: string }>`
  margin-top: 10px;
  position: relative;
  width: 100%;
  height: 300px;
  background: url(${({ previewUrl }) => previewUrl && previewUrl}) no-repeat center;
  background-color: ${({ previewUrl }) => !previewUrl && "#C4C4C4"};
  background-size: ${({ previewUrl }) => (previewUrl ? "cover" : "auto")};
  border: 1px solid var(--color-grey);
  cursor: pointer;
  &:hover {
    opacity: ${({ previewUrl }) => !previewUrl && "0.9"};
  }
  ${({ previewUrl }) => {
    if (!previewUrl) {
      return css`
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: url(${ImgIcon}) no-repeat center;
          background-color: var(--color-darkGrey);
          border-radius: 50%;
        }
      `;
    }
  }}
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageBtn = styled.button<{ previewUrl?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ previewUrl }) => (previewUrl ? "none" : "block")};
  width: 50px;
  height: 50px;
  background-color: var(--color-darkGrey);
  border-radius: 50%;
`;

export { Label, ImageBox, ImageInput, ImageBtn };
