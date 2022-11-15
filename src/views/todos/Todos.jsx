import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTodos from "./DialogTodos";
import ConfirmationDialog from "./ConfirmationDialog";
import Data from "../data";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: null,
      type: "",
      typeDele: "",
      openFormDialog: false,
      openConfirmDeleteDialog: false,
      openConfirmDeleteDialogAll: false,
      searchValue: "",
      rows: [...Data],
      selection: [],
    };
  }

  addNew = (data) => {
    if (
      data.code.length > 0 &&
      data.fullName.length > 0 &&
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
    let DataRows = this.state.rows;
    if (data.id !== null) {
      this.setState({
        rows: [
          {
            id: data.id,
            code: data.code,
            fullName: data.fullName,
            address: data.address,
            school: data.school,
            mail: data.mail,
            dob: data.dob,
          },
          ...DataRows.filter((item) => item.id !== data.id),
        ],
        openFormDialog: false,
      });
      toast.success("Sửa thành công!", { autoClose: 2000 });
    } else {
      toast.error("Không sửa đâu!!!", { autoClose: 2000 });
    }
  };

  handleDelete = (data) => {
    if (data.id) {
      let DataRows = this.state.rows;
      DataRows = DataRows.filter((item) => item.id !== data.id);
      this.setState({
        rows: DataRows,
        openConfirmDeleteDialog: false,
      });
      toast.success("Xóa thành công!");
    } else {
      toast.error("Lỗi rồi, không xóa đâu!!!");
    }
  };

  handleDeleteAll = () => {
    let DataRows = this.state.rows;
    let arrSelect = this.state.selection;
    let userFind = [];
    if (arrSelect !== null) {
      DataRows.filter((item) => {
        if (!arrSelect.includes(item.id)) {
          userFind.push(item);
        }
      });
      this.setState({
        rows: userFind,
        openConfirmDeleteDialogAll: false,
      });
      toast.success("Xóa thành công!");
    } else {
      toast.error("Lỗi rồi, có thấy ID đâu mà xóa!!!");
    }
  };

  handleDisabledDeleteAll = () => {
    if (this.state.selection.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  handleSearchVIE = (data) => {
    var str = data;
    console.log(str);
    str = str.toUpperCase();
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  };

  handleFilter = (data) => {
    if (this.state.searchValue === "") return data;
    if (
      data.code.toUpperCase().includes(this.state.searchValue.toUpperCase()) ||
      data.fullName
        .toUpperCase()
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/Đ/g, "D")
        .replace(
          /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
          " "
        )
        .replace(/ + /g, " ")
        .trim()
        .includes(this.state.searchValue.toUpperCase()) ||
      data.address
        .toUpperCase()
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/Đ/g, "D")
        .replace(
          /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
          " "
        )
        .replace(/ + /g, " ")
        .trim()
        .includes(this.state.searchValue.toUpperCase()) ||
      data.school
        .toUpperCase()
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/Đ/g, "D")
        .replace(
          /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
          " "
        )
        .replace(/ + /g, " ")
        .trim()
        .includes(this.state.searchValue.toUpperCase()) ||
      data.mail.toUpperCase().includes(this.state.searchValue.toUpperCase()) ||
      data.dob.toUpperCase().includes(this.state.searchValue.toUpperCase())
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
      openConfirmDeleteDialogAll,
      type,
      typeDele,
      searchValue,
      selection,
    } = this.state;

    const columns = [
      { field: "code", headerName: "Mã Sinh Viên", width: 100 },
      { field: "fullName", headerName: "Họ Tên", width: 150 },
      { field: "dob", headerName: "Ngày Sinh", width: 100 },
      { field: "address", headerName: "Địa Chỉ", width: 150 },
      { field: "school", headerName: "Tên Trường", width: 150 },
      { field: "mail", headerName: "Mail", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        width: 140,
        renderCell: (rowData) => {
          return (
            <>
              <Button>
                <EditIcon
                  color="primary"
                  onClick={() => {
                    this.setState({
                      type: "update",
                      currentData: rowData,
                      openFormDialog: true,
                    });
                  }}
                />
              </Button>
              <Button>
                <DeleteIcon
                  color="primary"
                  onClick={() =>
                    this.setState({
                      typeDele: "delete",
                      currentData: rowData,
                      openConfirmDeleteDialog: true,
                    })
                  }
                />
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
        <div style={{ height: 400, minWidth: "1000px", padding: "50px" }}>
          <Grid container spacing={2} className="btn">
            <Grid
              item
              xs={5}
              spacing={2}
              container
              justify="space-between"
              className="padding"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(rowData) =>
                    this.setState({
                      currentData: rowData,
                      type: "add",
                      openFormDialog: true,
                    })
                  }
                >
                  Thêm Sinh Viên
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(rowData) =>
                    this.setState({
                      currentData: rowData,
                      typeDele: "deleAll",
                      openConfirmDeleteDialogAll: true,
                    })
                  }
                  disabled={this.handleDisabledDeleteAll()}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4} className="padding">
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
              typeDele={typeDele}
              open={openConfirmDeleteDialog}
              onConfirmDialogClose={() =>
                this.setState({
                  openConfirmDeleteDialog: false,
                })
              }
              onYesClick={() => this.handleDelete(currentData)}
            />
          )}

          {openConfirmDeleteDialogAll && (
            <ConfirmationDialog
              typeDele={typeDele}
              open={openConfirmDeleteDialogAll}
              onConfirmDialogClose={() =>
                this.setState({
                  openConfirmDeleteDialogAll: false,
                })
              }
              onYesClick={() => this.handleDeleteAll(selection)}
            />
          )}

          <DataGrid
            rows={rows.filter((data) => this.handleFilter(data))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={true}
            onSelectionModelChange={(id) => {
              this.setState({ selection: id });
            }}
          />
        </div>
      </>
    );
  }
}
export default TodoList;
