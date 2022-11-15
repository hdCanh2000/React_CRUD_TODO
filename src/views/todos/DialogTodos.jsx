import React from "react";
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

class DialogTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: "",
        code: "",
        fullName: "",
        dob: "",
        mail: "",
        address: "",
        school: "",
      },
      propData: {
        dataRows: this.props.rows.map((item) => item),
        IdRows: this.props.rows.map((item) => item.id),
      },
      type: this.props.type,
      open: true,
    };
  }

  handleClose = () => {
    this.setState = {
      open: false,
    };
  };

  handleInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitData(this.state.formData);
  };

  handleDisabledSave = () => {
    // this.setState({ formData: { id: this.props.rows.map((item) => item.id) } });
    let checkData = this.state.formData;
    let currentData = this.props.rows.map((row) => row.code);
    let currentID = this.props.rows.map((row) => row.id);
    let id = currentID.filter((item) => item === checkData.id);
    let inputData = moment(checkData.dob).isValid();
    let inputYear = moment(checkData.dob).year();
    let nowYear = moment().year();

    if (
      !checkData.fullName ||
      !checkData.dob ||
      !checkData.school ||
      !checkData.address ||
      !checkData.mail
    ) {
      return true;
    }

    if (
      !checkData.code.match(/^[A-Z0-9]+$/) ||
      checkData.code.length < 6 ||
      checkData.code.length > 15
    ) {
      return true;
    }

    if (this.state.type === "add") {
      if (
        currentData.find((item) => item === checkData.code) ||
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

    if (this.state.type === "update") {
      if (checkData.id === id.map((item) => item)) {
        if (currentData.find((item) => item === checkData.code)) {
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

  componentDidMount() {
    const { currentData = {} } = this.props;
    const { row = {} } = currentData;
    this.setState({
      formData: {
        ...this.state.formData,
        ...row,
      },
    });
  }

  render() {
    const { closeDialog, type } = this.props;
    let { formData } = this.state;
    return (
      <div>
        <Dialog open={true} onClose={closeDialog}>
          <DialogTitle>
            <span style={{ color: "#1565c0" }}>
              {type === "add" ? "THÊM SINH VIÊN" : "SỬA THÔNG TIN SINH VIÊN"}
            </span>
          </DialogTitle>
          <div style={{ minWidth: "600px" }}>
            <DialogContent>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="code"
                    required
                    name="code"
                    label="Mã Sinh Viên "
                    fullWidth
                    value={this.state.formData.code}
                    onChange={(e) => this.handleInput(e)}
                    helperText={
                      <ErrorOutput
                        case={this.state.formData.code}
                        name={"code"}
                        caseId={this.state.formData.id}
                        type={this.state.type}
                        dataRows={this.props.rows.map((item) => item)}
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
                    onChange={(e) => this.handleInput(e)}
                  />
                </div>
                <Box
                  sx={{
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    margin="dense"
                    id="mail"
                    name="mail"
                    label="Mail "
                    type="mail"
                    fullWidth
                    value={formData.mail}
                    required
                    onChange={(e) => this.handleInput(e)}
                  />

                  <div style={{ padding: "5px" }}></div>

                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      inputFormat={"YYYY-MM-DD"}
                      value={formData.dob}
                      onChange={(e) =>
                        this.handleInput({
                          target: {
                            value: moment(e).format("YYYY-MM-DD"),
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
                      maxDate={moment().subtract(17, 'years')}
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
                              type={this.state.type}
                              dataRows={this.props.rows.map((item) => item)}
                            />
                          }
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
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
                    onChange={(e) => this.handleInput(e)}
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
                    onChange={(e) => this.handleInput(e)}
                  />
                </div>
                <p className="note-btn">(*) Không được để trống</p>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={closeDialog}
                  >
                    Đóng
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={this.handleDisabledSave()}
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
}

export default DialogTodo;
