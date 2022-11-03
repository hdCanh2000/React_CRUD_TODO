import React from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, Box, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import ErrorOutput from "./ErrorOutput";

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
      propData: {
        dataRows: this.props.rows.map((item) => item),
      },
      open: true,
    };
  }

  handleClose = () => {
    this.setState = {
      open: false,
    };
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
  };

  handleDisabled = () => {
    let checkData = this.state.formData;
    let currentData = this.props.rows.map((row) => row.code);
    if (
      // !currentData.includes(checkData.code) &&
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
      },
    });
  }

  componentDidUpdate() {}

  render() {
    const {
      closeDialog,
      type,
      // formData = {},
    } = this.props;

    let { formData, propData } = this.state;

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
                    value={this.state.formData.code}
                    onChange={(e) => this.handleInput(e)}
                    helperText={
                      <ErrorOutput
                        case={this.state.formData.code}
                        name={"code"}
                        dataRows={propData.dataRows}
                        // submit={this.state.submit}
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
                      type="date"
                      fullWidth
                      float="right"
                      required
                      defaultValue={formData.dob}
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
