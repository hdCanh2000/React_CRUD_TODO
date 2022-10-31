import React from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ErrorOutput = (props) => {
  let name = props.name;
  let inputValue = props.case;
  // let Rows = props.rows.code;
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
      // } else if (inputValue === Rows) {
      //   return (
      //     <span className="show-error">
      //       Mã sinh viên đã tồn tại.
      //     </span>
      //   );
    }
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

class DialogTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        code: "",
        fullName: "",
        age: "",
        dob: "",
        mail: "",
        address: "",
        school: "",
      },
      code: this.props.rowsCode,
      fullName: this.props.rowsFullName,
      age: this.props.rowsAge,
      dob: this.props.rowsDob,
      mail: this.props.rowsMail,
      address: this.props.rowsAddress,
      school: this.props.rowsSchool,
      // submit: false,
      open: true,
      hidenFormDialog: true,
    };
  }

  handleClose = () => {
    this.setState = {
      open: false,
    };
  };

  handleHideDialog = () => {
    this.setState({
      hidenFormDialog: false,
    });
  };

  handleInput = (e) => {
    const { name, value } = e.target;
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
    console.log(">>test add data to dialog", this.state.formData);
  };

  handleDisabled = () => {
    let checkData = this.state.formData;
    let currentData = this.props.code;
    if (
      checkData.code.match(/^[A-Z0-9]+$/) &&
      checkData.code.length > 5 &&
      checkData.code.length < 16 &&
      checkData.fullName &&
      checkData.dob &&
      checkData.school &&
      checkData.address &&
      checkData.mail
    ) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {
    this.setState({
      formData: {
        ...this.state.formData,
        ...this.props.currentData,
        ...this.props.rows,
      },
    });
  }

  componentDidUpdate() {}

  render() {
    // formData = {}
    const { closeDialog, type, rows } = this.props;
    let { formData } = this.state;
    return (
      <div>
        <Dialog open={true} onClose={closeDialog}>
          <DialogTitle>
            <span style={{ color: "#1565c0" }}>
              {type === "add" ? "THÊM SINH VIÊN" : "SỬA THÔNG TIN SINH VIÊN"}
            </span>
          </DialogTitle>
          <div style={{ width: "600px" }}>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  this.handleSubmit(e);
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
                    defaultValue={this.state.rowsCode}
                    value={this.state.formData.code}
                    onChange={(e) => this.handleInput(e)}
                  />
                  <ErrorOutput
                    case={this.state.formData.code}
                    name={"code"}
                    // submit={this.state.submit}
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
                  <>
                    <TextField
                      margin="dense"
                      id="age"
                      name="age"
                      label="Tuổi "
                      type="number"
                      value={formData.age}
                      required
                      onChange={(e) => this.handleInput(e)}
                      fullWidth
                    />
                  </>
                  <div style={{ padding: "5px" }}></div>
                  <>
                    <TextField
                      margin="dense"
                      id="dob"
                      name="dob"
                      label="Ngày Sinh "
                      type="text"
                      fullWidth
                      float="right"
                      required
                      value={formData.dob}
                      onChange={(e) => this.handleInput(e)}
                    />
                  </>
                </Box>
                <div className="padding">
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
                  {/* <ErrorOutput
                    case={this.state.formData.mail}
                    name={"mail"}
                    submit={this.state.submit}
                  /> */}
                </div>
                <div>
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
                    disabled={this.handleDisabled()}
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
