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
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { ImageListItem } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import styles from "../../styles/redux.css";
import ErrorOutput from "./ErrorOutput";
import { createUser, updateUser } from "../../Redux/actions/reduxToDoAction";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import defaultImage from "../../assets/img/avt_dark_gray.png";

function DialogTodo(props) {
  const dataUser = useSelector((state) => state.reduxToDo.listUser);

  const [type, setType] = useState(props.type);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
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

  const handleAddClick = () => {};

  const handleUpdateClick = () => {};

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
      <Dialog open={true} onClose={props.closeDialog} maxWidth={false}>
        <DialogTitle>
          <span style={{ color: "#1565c0" }}>
            {type === "add" ? "THÊM SINH VIÊN" : "THÔNG TIN SẢN PHẨM"}
          </span>
        </DialogTitle>
        <div style={{ width: "700px" }}>
          <DialogContent>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Box
                sx={{
                  width: "100%",
                  display: "block",
                  justifyContent: "space-between",
                }}
              >
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
                      id="id"
                      required
                      name="id"
                      label="Mã Sản Phẩm "
                      fullWidth
                      value={formData.id}
                      onChange={(e) => handleInput(e)}
                      // helperText={
                      //   <ErrorOutput
                      //     case={formData.code}
                      //     caseId={formData.id}
                      //     type={type}
                      //     name={"code"}
                      //   />
                      // }
                    />
                    <TextField
                      margin="dense"
                      id="title"
                      name="title"
                      label="Tên Sản Phẩm "
                      type="text"
                      fullWidth
                      value={formData.title}
                      required
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="imageUploadContainer">
                    <div className="previewWrapper">
                      <img
                        className="preview"
                        alt="avatar"
                        src={formData.image || defaultImage}
                      />
                      <div className="overlay" onClick={handleInputClick}>
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
                  <TextField
                    margin="dense"
                    id="category"
                    name="category"
                    label="Danh Mục Sản Phẩm "
                    type="text"
                    required
                    fullWidth
                    value={formData.category}
                    onChange={(e) => handleInput(e)}
                  />
                  <div style={{ padding: "5px" }}></div>
                  <TextField
                    margin="dense"
                    id="price"
                    name="price"
                    label="Giá Bán $ "
                    type="text"
                    fullWidth
                    value={formData.price}
                    required
                    onChange={(e) => handleInput(e)}
                  />
                </Box>
                <div className="padding">
                  <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Mô Tả "
                    type="text"
                    fullWidth
                    multiline
                    rows={5}
                    required
                    value={formData.description}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="padding">
                  <Box
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      margin="dense"
                      id="ratingRate"
                      name="ratingRate"
                      label="Tỷ lệ Đánh Giá Sản Phẩm "
                      type="text"
                      required
                      fullWidth
                      value={formData.rating.rate}
                      onChange={(e) => handleInput(e)}
                    />
                    <div style={{ padding: "5px" }}></div>
                    <TextField
                      margin="dense"
                      id="ratingCount"
                      name="ratingCount"
                      label="Số Lượng "
                      type="text"
                      fullWidth
                      value={formData.rating.count}
                      required
                      onChange={(e) => handleInput(e)}
                    />
                  </Box>
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
                    // disabled={handleDisabled()}
                    onClick={
                      type === "add" ? handleAddClick : handleUpdateClick
                    }
                  >
                    Lưu
                  </Button>
                </DialogActions>
              </Box>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
export default DialogTodo;
