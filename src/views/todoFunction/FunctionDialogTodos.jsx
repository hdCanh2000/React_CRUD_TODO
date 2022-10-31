import React from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
    console.log("+++++ test data dialog", this.state.formData);
  };

  componentDidMount() {
    this.setState({
      formData: {
        ...this.state.formData,
        ...this.props.currentData,
      },
    });
    // console.log('>>>>>>>',this.state.formData)
  }

  render() {
    // let { formData } = this.state;
    const { closeDialog, type, formData = {} } = this.props;

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
                    mmargin="dense"
                    id="code"
                    required
                    name="code"
                    label="Mã Sinh Viên"
                    fullWidth
                    value={formData.code}
                    onChange={(e) => this.handleInput(e)}
                  />
                </div>
                <div>
                  <TextField
                    margin="dense"
                    id="fullName"
                    name="fullName"
                    label="Họ Và Tên"
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
                    // paddingRight: '20px'
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <TextField
                      margin="dense"
                      id="age"
                      name="age"
                      label="Tuổi"
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
                      label="Ngày Sinh"
                      type="text"
                      fullWidth
                      float="right"
                      required
                      value={formData.dob}
                      onChange={(e) => this.handleInput(e)}
                    />
                  </>
                </Box>
                <div>
                  <TextField
                    margin="dense"
                    id="mail"
                    name="mail"
                    label="Mail"
                    type="mail"
                    fullWidth
                    value={formData.mail}
                    required
                    onChange={(e) => this.handleInput(e)}
                  />
                </div>
                <div>
                  <TextField
                    margin="dense"
                    id="address"
                    name="address"
                    label="Địa Chỉ"
                    type="text"
                    fullWidth
                    required
                    value={formData.address}
                    onChange={(e) => this.handleInput(e)}
                  />
                </div>
                <div>
                  <TextField
                    margin="dense"
                    id="school"
                    name="school"
                    label="Tên Trường Học"
                    type="text"
                    fullWidth
                    required
                    value={formData.school}
                    onChange={(e) => this.handleInput(e)}
                  />
                </div>
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontStyle: "italic",
                    float: "left",
                  }}
                >
                  (*) Không được để trống
                </p>
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
                    disabled={
                      !this.state.formData.code ||
                      !this.state.formData.fullName ||
                      !this.state.formData.age ||
                      !this.state.formData.address ||
                      !this.state.formData.dob ||
                      !this.state.formData.mail ||
                      !this.state.formData.school
                    }
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
