import React, { useRef, useState } from "react";
import * as S from "./uploadImgStyle";
import ImgIcon from "../../../assets/icons/icon-image.svg";

interface UploadBtnProps {
  inputFile: React.MutableRefObject<HTMLInputElement>;
  handlePreview: (src: string) => void;
  image: string;
}

//이미지 업로드 버튼
function UploadBtn({ inputFile, handlePreview, image }: UploadBtnProps) {
  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handlePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <S.ImageInput
        ref={inputFile}
        onChange={saveImage}
        type="file"
        accept=".jpg, .gif, .png, .jpeg, .bmp, .tif, .heic"
      />
      <S.ImageBtn type="button" image={image}>
        <img src={ImgIcon} />
      </S.ImageBtn>
    </div>
  );
}

//이미지 업로드 박스
function UploadImgBox() {
  const inputFile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [preview, setPreview] = useState("");

  const onFileInput = () => {
    inputFile.current.click();
  };

  const handlePreview = (src: string) => {
    setPreview(src);
  };
  return (
    <article>
      <S.Title>상품 이미지</S.Title>
      <S.ImageBox image={preview} onClick={onFileInput}>
        {preview && <img src={preview} />}
        <UploadBtn inputFile={inputFile} handlePreview={handlePreview} image={preview} />
      </S.ImageBox>
    </article>
  );
}

export default UploadImgBox;
