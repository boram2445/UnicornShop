import React from "react";
import { LargeBtn, MediumBtn, MsBtn, SmallBtn, TabAcityBtn, TabMenuBtn } from "./buttonStyle";

type ButtonProps = {
  type: string;
  text: string;
  state?: string;
  size?: string;
  color?: string;
};

function Button({ type, text, state, color }: ButtonProps) {
  return (
    <>
      {type === "large" && (
        <LargeBtn type="button" state={state}>
          {text}
        </LargeBtn>
      )}
      {type === "medium" && (
        <MediumBtn type="button" state={state}>
          {text}
        </MediumBtn>
      )}
      {type === "ms" && (
        <MsBtn type="button" state={state} color={color}>
          {text}
        </MsBtn>
      )}
      {type === "small" && <SmallBtn>{text}</SmallBtn>}
      {type === "tabAcity" && <TabAcityBtn>{text}</TabAcityBtn>}
      {type === "tabMenu" && (
        <TabMenuBtn>
          {text}
          <span>1</span>
        </TabMenuBtn>
      )}
    </>
  );
}

export default Button;
