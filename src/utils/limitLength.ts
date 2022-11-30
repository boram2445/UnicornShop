//입력값 길이 제한 함수
const limitLength = (value: string, maxLen: number) => {
  if (value.length > maxLen) {
    value = value.substring(0, maxLen);
  }
  return value;
};

export default limitLength;
