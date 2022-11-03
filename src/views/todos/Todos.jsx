import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

import DialogTodos from "./DialogTodos";
import ConfirmationDialog from "./ConfirmationDialog";
import Data from "./data";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: null,
      type: "",
      openFormDialog: false,
      openConfirmDeleteDialog: false,
      searchValue: "",
      newRows: [],
      rows: [
        {
          id: 1,
          code: "DTC1854",
          fullName: "123Canh",
          age: 35,
          address: "Ninh Bình",
          school: "ĐH Hoa Lư",
          mail: "hdc@gmail.com",
          dob: "2000-03-31",
        },
        {
          id: 2,
          code: "18452",
          fullName: "Duc456",
          age: 35,
          address: "Hà Nội",
          school: "ĐHQG",
          mail: "hdc@gmail.com",
          dob: "2000-03-31",
        },
        {
          id: 3,
          code: "1254",
          fullName: "Hoang789",
          age: 35,
          address: "Thái Nguyên",
          school: "ĐH Thái Nguyên",
          mail: "hdc@gmail.com",
          dob: "2000-03-31",
        },
      ],
      // rows: Data,
    };
  }

  handleShowDialog = (item) => {
    this.setState({
      currentData: null,
      type: "add",
      openFormDialog: true,
    });
  };

  addNew = (data) => {
    if (
      data.code.length > 0 &&
      data.fullName.length > 0 &&
      data.age.length > 0 &&
      data.address.length > 0 &&
      data.school.length > 0 &&
      data.mail.length > 0
    ) {
      this.setState({
        rows: [
          {
            id: Math.floor(Math.random() * 100000000000),
            code: data.code,
            fullName: data.fullName,
            age: data.age,
            address: data.address,
            school: data.school,
            mail: data.mail,
            dob: data.dob,
          },
          ...this.state.rows,
        ],
        openFormDialog: false,
      });
      toast.success("Thêm sinh viên thành công!!", { autoClose: 2000 });
    } else {
      toast.error("Nhập đúng nhập đủ chưa mà đòi thêm??", { autoClose: 3000 });
    }
  };

  handleUpdate = (data) => {
    let currentData = this.state.rows;
    if (data !== null) {
      currentData.filter((item) => {
        if (item.id === data.id) {
          this.setState({
            rows: [
              {
                id: data.id,
                code: data.code,
                fullName: data.fullName,
                age: data.age,
                address: data.address,
                school: data.school,
                mail: data.mail,
                dob: data.dob,
              },
              ...currentData.filter((item) => item.id !== data.id),
            ],
            openFormDialog: false,
          });
        }
      });
      toast.success("Sửa thành công!", { autoClose: 2000 });
    } else {
      toast.error("Không sửa đâu!!!", { autoClose: 2000 });
    }
  };

  handleDelete = (data) => {
    if (data.id) {
      let currentData = this.state.rows;
      currentData = currentData.filter((item) => item.id !== data.id);
      this.setState({
        rows: currentData,
        openConfirmDeleteDialog: false,
      });
      toast.success("Xóa thành công!");
    } else {
      toast.error("Lỗi rồi, không xóa đâu!!!");
    }
  };

  handleFilter = (data) => {
    if (this.state.searchValue === "") return data;
    if (
      data.code.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
      data.fullName
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      data.age
        .toString()
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      data.address
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      data.school
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      data.mail.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
      data.dob.toLowerCase().includes(this.state.searchValue.toLowerCase())
    )
      return data;
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    let {
      openFormDialog,
      currentData,
      rows,
      openConfirmDeleteDialog,
      type,
      searchValue,
    } = this.state;

    const columns = [
      { field: "code", headerName: "Mã Sinh Viên", width: 150 },
      { field: "fullName", headerName: "Họ Tên", width: 150 },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 50,
      },
      { field: "address", headerName: "Địa Chỉ", width: 100 },
      { field: "school", headerName: "Tên Trường", width: 150 },
      { field: "mail", headerName: "Mail", width: 150 },
      { field: "dob", headerName: "Ngày Sinh", width: 130 },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (rowData) => {
          return (
            <>
              <Button
                color="primary"
                onClick={() =>
                  this.setState({
                    type: "update",
                    currentData: rowData,
                    openFormDialog: true,
                  })
                }
              >
                Edit
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  this.setState({
                    currentData: rowData,
                    openConfirmDeleteDialog: true,
                  })
                }
              >
                Delete
              </Button>
            </>
          );
        },
      },
    ];

    return (
      <>
        <div>
          <ToastContainer />
        </div>
        <div style={{ height: 400, width: "1100px" }}>
          <Grid container spacing={12} className="btn">
            <Grid item xs={8} container justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(item) => this.handleShowDialog(item)}
                >
                  Thêm Sinh Viên
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={searchValue}
                size="small"
                placeholder="Tìm kiếm..."
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  this.setState({
                    searchValue: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          {openFormDialog && (
            <DialogTodos
              closeDialog={() =>
                this.setState({
                  openFormDialog: false,
                  type: "add",
                })
              }
              type={type}
              submitData={(newData) =>
                newData.id ? this.handleUpdate(newData) : this.addNew(newData)
              }
              currentData={currentData}
              rows={rows.map((item) => item)}
            />
          )}
          {openConfirmDeleteDialog && (
            <ConfirmationDialog
              open={openConfirmDeleteDialog}
              onConfirmDialogClose={() =>
                this.setState({
                  openConfirmDeleteDialog: false,
                })
              }
              onYesClick={() => this.handleDelete(currentData)}
            />
          )}
          <DataGrid
            rows={rows.filter((data) => this.handleFilter(data))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </>
    );
  }
}

export default TodoList;
