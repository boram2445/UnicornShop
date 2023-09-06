import React, { useRef, useState } from "react";
import * as S from "./uploadImgStyle";

type UploadImgProps = {
  handleImgFile: (file: File) => void;
  image?: string;
};

function UploadImgBox({ handleImgFile, image }: UploadImgProps) {
  const inputFile = useRef() as React.MutableRefObject<HTMLInputElement>;
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
