import React, { useRef, useState } from "react";
import * as S from "./uploadImgStyle";

type UploadImgProps = {
  handleImgFile: (file: File) => void;
  image?: string;
};

//이미지 업로드 박스
function UploadImgBox({ handleImgFile, image }: UploadImgProps) {
  const inputFile = useRef() as React.MutableRefObject<HTMLInputElement>;
  //기존의 이미지 파일은 string으로 이루어져 있으나, 수정 하고 데이터를 보낼때는 file형태로 보내야 한다.
  //미해결 -개선 필요
  const [previewUrl, setPreviewUrl] = useState(image);

  const onFileInput = () => {
    inputFile.current.value = "";
    inputFile.current.click();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    handleImgFile(file);
  };

  return (
    <article>
      <S.Label htmlFor="productImage">상품 이미지</S.Label>
      <S.ImageBox onClick={onFileInput} previewUrl={previewUrl}>
        <S.ImageInput
          id="productImage"
          ref={inputFile}
          onChange={handleImage}
          type="file"
          accept=".jpg, .gif, .png, .jpeg, .bmp, .tif, .heic"
        />
      </S.ImageBox>
    </article>
  );
}

export default UploadImgBox;
