import React from "react";
import moment from "moment";
import { useSelector } from 'react-redux';

const ErrorOutput = (props) => {
  const dataUser = useSelector((state) => state.reduxToDo.listUser);

  let name = props.name;
  let type = props.type;
  let inputValue = props.case;
  let inputValueDate = props.caseDob;
  let ValueId = props.caseId;
  let checkCode = dataUser.map((item) => item.code);
  let checkId = dataUser.map((item) => item.id);
  let inputData = props.dateInput;
  let inputYear = moment(inputValueDate).year();
  let nowYear = moment().year();
  // console.log(checkCode, "check code array");
  // console.log(inputValue, "check code input");
  // console.log(checkId, "array id");
  // console.log(ValueId, "check id input");

  // ----------Check error Update User----------
  if (type === "update") {
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
            Mã sinh viên không hợp lệ (Yêu cầu mã sinh viên trên 6-15 ký tự và
            số)
          </span>
        );
      } else if (
        ValueId === checkId.filter((item) => item) ||
        inputValue === checkCode.filter((item) => item)
      ) {
        return <span className="show-error">Mã sinh viên này đã tồn tại.</span>;
      }
      // else if (
      //   // ValueId !== checkId.filter((item) => item) &&
      //   inputValue === checkCode.filter((item) => item === inputValue)
      // ) {
      //   return <span className="show-error">Mã sinh viên này đã tồn tại.</span>;
      // }
      return <span></span>;
    }

    if (name === "dob") {
      if (inputData === false) {
        return (
          <span className="show-error">Định dạng ngày sinh YYYY-MM-DD</span>
        );
      }
      if (nowYear - inputYear < 18 || nowYear - inputYear > 122) {
        return (
          <span className="show-error">
            Năm sinh không hợp lệ (1900 =&gt; {nowYear - 18})
          </span>
        );
      }
      return <span></span>;
    }
  }

  // ----------Check error ADD User----------
  if (type === "add") {
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
            Mã sinh viên không hợp lệ (Yêu cầu mã sinh viên trên 6-15 ký tự và
            số)
          </span>
        );
      } else if (checkCode.find((item) => item === inputValue)) {
        return <span className="show-error">Mã sinh viên này đã tồn tại.</span>;
      }
      return <span></span>;
    }

    if (name === "dob") {
      if (inputData === false) {
        return (
          <span className="show-error">Định dạng ngày sinh MM-DD-YYYY</span>
        );
      }
      if (nowYear - inputYear < 18 || nowYear - inputYear > 122) {
        return (
          <span className="show-error">
            Năm sinh không hợp lệ (1900 =&gt; {nowYear - 18})
          </span>
        );
      }
      return <span></span>;
    }
  }
};
export default ErrorOutput;
