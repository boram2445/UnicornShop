import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostLogin, getAuthState } from "../../../reducer/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import { UserType } from "../../../types/auth";
import * as S from "./loginFormStyle";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const initialValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [message, setMessage] = useState("");
  const [toggleUserType, setToggleUserType] = useState<UserType>("BUYER");
  const { status, error } = useAppSelector(getAuthState);

  useEffect(() => {
    if (status === "failed") {
      setMessage(error);
      passwordRef.current.value = "";
      passwordRef.current.focus();
    }
    if (status === "succeeded") {
      setFormValues(initialValues);
      navigate("/");
    }
  }, [status]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) return;
    const { username, password } = formValues;
    const userData = {
      username,
      password,
      login_type: toggleUserType,
    };
    dispatch(fetchPostLogin(userData));
  };

  return (
    <S.LoginSection>
      <ToggleBtn toggleUserType={toggleUserType} onToggle={setToggleUserType} />
      <S.LoginForm onSubmit={onSubmit}>
        <S.LoginInput
          type="text"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={formValues.username}
          autoComplete="off"
          required
        />
        <S.LoginInput
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={formValues.password}
          required
        />
        {error ? <S.ErrorText>{message}</S.ErrorText> : null}
        <NormalBtn type="submit" padding="19px 0">
          로그인
        </NormalBtn>
      </S.LoginForm>
    </S.LoginSection>
  );
}

export default LoginForm;
