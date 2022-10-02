import React from "react";
import DaumPostcode from "react-daum-postcode";

type PostAddressProps = {
  getAddress: (zoneCode: string, address: string) => void;
};

function PostAddress({ getAddress }: PostAddressProps) {
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

  const customStyles = {
    left: "0",
    margin: "auto",
    width: "500px",
    height: "600px",
    padding: "0",
    overflow: "hidden",
  };

  return <DaumPostcode autoClose onComplete={onCompletePost} style={customStyles} />;
}

export default PostAddress;
