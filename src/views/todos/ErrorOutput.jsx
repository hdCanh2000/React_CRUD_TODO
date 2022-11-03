import React from "react";

const ErrorOutput = (props) => {
  let name = props.name;
  let inputValue = props.case;
  let checkCode = props.dataRows.map((row) => row.code);
  // let submit = props.submit;
  if (name === "code") {
    if (!inputValue.match(/^[A-Z0-9]+$/)) {
      return (
        <span className="show-error">
          Mã sinh viên yêu cầu ký tự chữ cái in hoa và số
        </span>
      );
    } else if (inputValue.length < 6 || inputValue.length > 15) {
      return (
        <span className="show-error">
          Mã sinh viên không hợp lệ (Yêu cầu mã sinh viên trên 6-15 ký tự và số)
        </span>
      );
    } else if (checkCode.includes(inputValue)) {
      return (
        <span className="show-error">
          Mã sinh viên này đã tồn tại.
        </span>
      );
    }
    // console.log(">>>props code", checkCode);
    return <span></span>;
  }
  // if (code === "mail") {
  //   if (!inputValue.match(/^[@]+$/) && inputValue.length > 0) {
  //     return <span className="show-error">Numbers only</span>;
  //   } else if (submit && inputValue.length === 0) {
  //     return <span className="show-error">Required</span>;
  //   }
  //   return <span></span>;
  // }
};

export default ErrorOutput;
