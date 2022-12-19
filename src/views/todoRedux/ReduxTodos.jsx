import React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import ConfirmationDialog from "./ConfirmDialog";
import Avatar from "@mui/material/Avatar";
import DialogTodos from "./ReduxDialogTodos";

import { useDispatch } from "react-redux";
import { deleteUser, deleteAllUser } from "../../Redux/actions/reduxToDoAction";

function TodoList() {
  const dataUser = useSelector((state) => state.reduxToDo.listUser);

  const [currentData, setCurrentData] = useState(null);
  const [type, setType] = useState("");
  const [typeDele, setTypeDele] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openConfirmDeleteAll, setOpenConfirmDeleteAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selection, setSelection] = useState([]);

  const dispatch = useDispatch();

  const handleDisabledDeleteAll = () => {
    if (selection.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleDelete = (data) => {
    if (data.id) {
      dispatch(
        deleteUser({
          id: data.id,
        })
      );
      setOpenConfirmDeleteDialog(false);
      toast.success("Xóa thành công!", { autoClose: 2000 });
    } else {
      toast.error("Lỗi rồi, không xóa đâu!!!");
    }
  };

  const handleDeleteAll = () => {
    if (selection.length > 0) {
      dispatch(
        deleteAllUser({
          selection: selection,
          dataUser: dataUser,
        })
      );
      setOpenConfirmDeleteAll(false);
      toast.success("Xóa thành công!", { autoClose: 2000 });
    } else {
      toast.error("Lỗi rồi, có thấy ID đâu mà xóa!!!");
    }
  };

  const handleFilter = (data) => {
    if (searchValue === "") return data;
    if (
      data.code.toLowerCase().includes(searchValue.toLowerCase()) ||
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
        .includes(searchValue.toUpperCase()) ||
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
        .includes(searchValue.toUpperCase()) ||
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
        .includes(searchValue.toUpperCase()) ||
      data.mail.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.dob.toLowerCase().includes(searchValue.toLowerCase())
    )
      return data;
  };
  const columns = [
    { field: "code", headerName: "Mã Sinh Viên", width: 120 },
    { field: "fullName", headerName: "Họ Tên", width: 150 },
    { field: "dob", headerName: "Ngày Sinh", width: 100 },
    { field: "address", headerName: "Địa Chỉ", width: 120 },
    { field: "school", headerName: "Tên Trường", width: 120 },
    { field: "mail", headerName: "Mail", width: 120 },
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
                  setType("update");
                  setCurrentData(rowData);
                  setOpenFormDialog(true);
                }}
              />
            </Button>
            <Button>
              <DeleteIcon
                color="primary"
                onClick={() => {
                  setType("delete");
                  setCurrentData(rowData);
                  setOpenConfirmDeleteDialog(true);
                }}
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
                xs={5}
                onClick={(rowData) => {
                  setCurrentData(rowData);
                  setType("add");
                  setOpenFormDialog(true);
                }}
              >
                Thêm Sinh Viên
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={(rowData) => {
                  setCurrentData(rowData);
                  setTypeDele("deleAll");
                  setOpenConfirmDeleteAll(true);
                }}
                disabled={handleDisabledDeleteAll()}
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
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        </Grid>

        {openFormDialog && (
          <DialogTodos
            closeDialog={() => setOpenFormDialog(false)}
            type={type}
            currentData={currentData}
          />
        )}

        {openConfirmDeleteDialog && (
          <ConfirmationDialog
            open={openConfirmDeleteDialog}
            onConfirmDialogClose={() => setOpenConfirmDeleteDialog(false)}
            onYesClick={() => handleDelete(currentData)}
          />
        )}

        {openConfirmDeleteAll && (
          <ConfirmationDialog
            typeDele={typeDele}
            open={openConfirmDeleteAll}
            onConfirmDialogClose={() => setOpenConfirmDeleteAll(false)}
            onYesClick={() => handleDeleteAll(selection)}
          />
        )}

        <DataGrid
          rows={dataUser.filter((data) => handleFilter(data))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={true}
          onSelectionModelChange={(id) => {
            setSelection(id);
          }}
        />
      </div>
    </>
  );
}
export default TodoList;
