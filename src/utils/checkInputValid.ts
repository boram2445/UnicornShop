//입력값 길이 제한 함수
const limitInputLength = (value: string, maxLen: number) => {
  if (value.length > maxLen) {
    value = value.substring(0, maxLen);
  }
  return value;
};

//오류 메세지 반환 함수 - 3자리, 3~4자리, 4자리 제한
const handleInputError = (name: string, value: string, message: string) => {
  switch (name) {
    case "username":
      if (!value.match("^[A-Za-z0-9]{3,21}$")) {
        return message;
      }
      return "";
    case "password":
      if (!value.match("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$")) {
        return message;
      }
      return "";
    case "name":
      if (!value.match("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$")) {
        return message;
      }
      return "";
    case "phone1":
      if (!value.match("^[0-9]{3}$")) {
        return message;
      }
      return "";
    case "phone2":
      if (!value.match("^[0-9]{3,4}$")) {
        return message;
      }
      return "";
    case "phone3":
      if (!value.match("^[0-9]{4}$")) {
        return message;
      }
      return "";
    case "email1":
      if (!value.match("^[a-zA-Z0-9]*$")) {
        return message;
      }
      return "";
    case "email2":
      if (!value.match("^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$")) {
        return message;
      }
      return "";
    default:
      return "";
  }
};

export { limitInputLength, handleInputError };
