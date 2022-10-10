import React, { useState } from "react";
import { InputEmail, InputForm, InputPhone } from "../InputForm/InputForm";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import * as S from "./joinFormStyle";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchPostUserName, getUserNameError } from "../../../reducers/joinSlice";

function JoinForm() {
  const dispatch = useAppDispatch();
  const nameError = useAppSelector(getUserNameError);

  //onChange 이벤트에 따라 state값을 실시간으로 받아온다.
  const [values, setValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
  });

  //아이디 중복 확인 버튼
  const checkUserNameVaild = (username: string) => {
    console.log(username);
    dispatch(fetchPostUserName(username));
    // if (nameError) {
    //   console.log(nameError);
    // }
  };

  //input value 값 onchange 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <S.JoinFormSection>
      <ToggleBtn />
      <S.JoinForm>
        <InputForm
          label="아이디"
          type="text"
          name="username"
          width="346px"
          onClick={checkUserNameVaild}
          onChange={onChange}
          pattern="^[A-Za-z0-9]{3,20}$"
          error="아이디는 3-20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다."
          required={true}
          maxlength="20"
        />
        <InputForm
          label="비밀번호"
          type="password"
          name="password"
          icon={true}
          onChange={onChange}
          error="비밀번호는 영문, 숫자 조합 8-20자리를 입력해주세요."
          pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$"
          required={true}
          maxlength="20"
        />
        <InputForm
          label="비밀번호 재확인"
          type="password"
          name="confirmPassword"
          icon={true}
          onChange={onChange}
          error="비밀번호가 일치하지 않습니다."
          pattern={values.password}
          required={true}
          maxlength="20"
        />
        <InputForm
          label="이름"
          type="text"
          name="name"
          onChange={onChange}
          required={true}
          pattern="[^(가-힣)a-zA-Z]"
        />
        <InputPhone />
        <InputEmail />
      </S.JoinForm>
    </S.JoinFormSection>
  );
}

export default JoinForm;
