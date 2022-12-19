import React from "react";
import { useEffect, useState, useRef } from "react";
import { Button, Dialog, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { ImageListItem } from "@mui/material";
import styles from '../../styles/redux.css';
import ErrorOutput from "./ErrorOutput";
import { createUser, updateUser } from "../../Redux/actions/reduxToDoAction";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import defaultImage from '../../assets/img/avt_dark_gray.png'

function DialogTodo(props) {
  const dataUser = useSelector((state) => state.reduxToDo.listUser);

  const [type, setType] = useState(props.type);
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    fullName: "",
    dob: null,
    mail: "",
    address: "",
    school: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "add") {
      if (
        formData.code.length > 0 &&
        formData.fullName.length > 0 &&
        formData.address.length > 0 &&
        formData.school.length > 0 &&
        formData.mail.length > 0
      ) {
        dispatch(
          createUser({
            id: uuidv4(),
            code: formData.code,
            fullName: formData.fullName,
            dob: formData.dob,
            mail: formData.mail,
            address: formData.mail,
            school: formData.school,
          })
        );
        props.closeDialog(false);
        toast.success("Thêm sinh viên thành công!!", { autoClose: 2000 });
      } else {
        toast.error("Nhập đúng nhập đủ chưa mà đòi thêm??", {
          autoClose: 3000,
        });
      }
    } else if (type === "update") {
      if (
        formData.code.length > 0 &&
        formData.fullName.length > 0 &&
        formData.address.length > 0 &&
        formData.school.length > 0 &&
        formData.mail.length > 0
      ) {
        dispatch(
          updateUser({
            id: formData.id,
            code: formData.code,
            fullName: formData.fullName,
            dob: formData.dob,
            mail: formData.mail,
            address: formData.mail,
            school: formData.school,
          })
        );
        props.closeDialog(false);
        console.log(formData);
        toast.success("Sửa thông tin sinh viên thành công!!", {
          autoClose: 2000,
        });
      } else {
        toast.error("Nhập đúng nhập đủ chưa mà đòi sửa??", { autoClose: 2000 });
      }
    }
  };

  const handleInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const { currentData = {} } = props;
    const { row = {} } = currentData;
    setFormData({
      ...formData,
      ...row,
    });
  }, []);

  // const defaultImage = "https://picsum.photos/150/150?random=1";
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleInputClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDisabled = () => {
    let currentData = dataUser.map((row) => row.code);
    let currentID = dataUser.map((row) => row.id);
    let id = currentID.filter((item) => item === formData.id);
    let inputData = moment(formData.dob).isValid();
    let inputYear = moment(formData.dob).year();
    let nowYear = moment().year();

    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.school ||
      !formData.address ||
      !formData.mail
    ) {
      return true;
    }

    if (
      !formData.code.match(/^[A-Z0-9]+$/) ||
      formData.code.length < 6 ||
      formData.code.length > 15
    ) {
      return true;
    }

    if (type === "add") {
      if (
        currentData.find((item) => item === formData.code) ||
        inputData === false ||
        inputYear === "" ||
        inputYear > nowYear ||
        nowYear - inputYear < 18 ||
        nowYear - inputYear > 122
      ) {
        return true;
      }
      return false;
    }

    if (type === "update") {
      if (formData.id === id.map((item) => item)) {
        if (currentData.find((item) => item === formData.code)) {
          return true;
        }
        return true;
      }
      if (
        inputData === false ||
        inputYear === "" ||
        inputYear > nowYear ||
        nowYear - inputYear < 18 ||
        nowYear - inputYear > 122
      ) {
        return true;
      }
      return false;
    }
  };

  return (
    <div>
      <ToastContainer />
      <Dialog open={true} onClose={props.closeDialog}>
        <DialogTitle>
          <span style={{ color: "#1565c0" }}>
            {type === "add"
              ? "THÊM SINH VIÊN"
              : `SỬA THÔNG TIN SINH VIÊN: ${formData.fullName.toUpperCase()}`}
          </span>
        </DialogTitle>
        <div style={{ width: "600px" }}>
          <DialogContent>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Box
                sx={{
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="code"
                    required
                    name="code"
                    label="Mã Sinh Viên "
                    fullWidth
                    value={formData.code}
                    onChange={(e) => handleInput(e)}
                    helperText={
                      <ErrorOutput
                        case={formData.code}
                        caseId={formData.id}
                        type={type}
                        name={"code"}
                      />
                    }
                  />
                  <TextField
                    margin="dense"
                    id="fullName"
                    name="fullName"
                    label="Họ Và Tên "
                    type="text"
                    required
                    fullWidth
                    value={formData.fullName}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className='imageUploadContainer'>
                  <div className='previewWrapper'>
                    <img
                      className='preview'
                      alt="avatar"
                      src={preview || defaultImage}
                    />
                    <div className='overlay' onClick={handleInputClick}>
                      Upload
                    </div>
                  </div>

                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </Box>
              <Box
                sx={{
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    value={formData.dob}
                    onChange={(e) =>
                      handleInput({
                        target: {
                          value: moment(e).format("YYYY-MM-DD", true),
                          name: "dob",
                        },
                      })
                    }
                    label="Ngày Sinh "
                    name="dob"
                    id="dob"
                    autoOk={true}
                    openTo="year"
                    minDate={moment("1900-01-01")}
                    maxDate={moment().subtract(17, "years")}
                    renderInput={(params) => (
                      <TextField
                        format={"YYYY-MM-DD"}
                        margin="dense"
                        id="dob"
                        name="dob"
                        type="text"
                        float="right"
                        fullWidth
                        required
                        helperText={
                          <ErrorOutput
                            caseDob={formData.dob}
                            name={"dob"}
                            dateInput={moment(formData.dob).isValid()}
                            type={type}
                          />
                        }
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
                <div style={{ padding: "5px" }}></div>
                <TextField
                  margin="dense"
                  id="mail"
                  name="mail"
                  label="Mail "
                  type="mail"
                  fullWidth
                  value={formData.mail}
                  required
                  onChange={(e) => handleInput(e)}
                />
              </Box>
              <div className="padding">
                <TextField
                  margin="dense"
                  id="address"
                  name="address"
                  label="Địa Chỉ "
                  type="text"
                  fullWidth
                  required
                  value={formData.address}
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="padding">
                <TextField
                  margin="dense"
                  id="school"
                  name="school"
                  label="Tên Trường Học "
                  type="text"
                  fullWidth
                  required
                  value={formData.school}
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <p className="note-btn">(*) Không được để trống</p>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.closeDialog}
                >
                  Đóng
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={handleDisabled()}
                  // onClick={type === "add" ? handleAddClick : handleUpdateClick}
                >
                  Lưu
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
export default DialogTodo;
