import React from "react";
import {
  LargeBtn,
  MediumBtn,
  SmBtn,
  SmallBtn,
  SsmallBtn,
  TabAcityBtn,
  TabMenuBtn,
} from "./buttonStyle";

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
      {type === "smedium" && (
        <SmBtn type="button" state={state} color={color}>
          {text}
        </SmBtn>
      )}
      {type === "small" && <SmallBtn>{text}</SmallBtn>}
      {type === "ssmall" && <SsmallBtn>{text}</SsmallBtn>}
      {type === "tabAcity" && <TabAcityBtn state={state}>{text}</TabAcityBtn>}
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
