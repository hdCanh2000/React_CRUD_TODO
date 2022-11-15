import React from "react";
import { useEffect, useState } from "react";
import { Button, Dialog, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ErrorOutput from "./ErrorOutput";

function DialogTodo(props) {
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    fullName: "",
    dob: null,
    mail: "",
    address: "",
    school: "",
  });
  const [type, setType] = useState(props.type);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const { currentData = {} } = props;
    const { row = {} } = currentData;
    setFormData({
      ...formData,
      ...row,
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitData(formData);
  };

  const handleDisabled = () => {
    let currentData = props.rows.map((row) => row.code);
    let currentID = props.rows.map((row) => row.id);
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
      <Dialog open={true} onClose={props.closeDialog}>
        <DialogTitle>
          <span style={{ color: "#1565c0" }}>
            {type === "add" ? "THÊM SINH VIÊN" : "SỬA THÔNG TIN SINH VIÊN"}
          </span>
        </DialogTitle>
        <div style={{ width: "600px" }}>
          <DialogContent>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                      dataRows={props.rows.map((item) => item)}
                    />
                  }
                />
              </div>
              <div className="padding">
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
                            dataRows={props.rows.map((item) => item)}
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
