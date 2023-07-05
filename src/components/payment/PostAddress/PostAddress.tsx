import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import { NormalBtn } from "../../common/Button/Button";

interface PostAddressProps {
  getAddress: (zoneCode: string, address: string) => void;
}

function PostAddress({ getAddress }: PostAddressProps) {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const onCompletePost = (data: any) => {
    let fullAddr = data.address;
    let extraAddr = "";
    //도로명 타입
    if (data.addressType === "R") {
      //법정동명
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      //건물명 or 주택명
      if (data.buildingName !== "") {
        extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    getAddress(data.zonecode, fullAddr);
  };
  const handleClick = () => open({ onComplete: onCompletePost });

  return (
    <NormalBtn type="button" onClick={handleClick} width="9rem" fontSize="1.5rem">
      주소 찾기
    </NormalBtn>
  );
}

export default PostAddress;
