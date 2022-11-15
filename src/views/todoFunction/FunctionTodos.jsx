import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTodos from "./FunctionDialogTodos";
import ConfirmationDialog from "./ConfirmDialog";
import Data from "../data";

function TodoList() {
  const [rows, setRows] = useState([...Data]);
  const [currentData, setCurrentData] = useState(null);
  const [type, setType] = useState("");
  const [typeDele, setTypeDele] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openConfirmDeleteDialogAll, setOpenConfirmDeleteDialogAll] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selection, setSelection] = useState([]);

  // useEffect(() => {
  //
  // }, [])

  const handleAddNew = (data) => {
    if (
      data.code.length > 0 &&
      data.fullName.length > 0 &&
      data.address.length > 0 &&
      data.school.length > 0 &&
      data.mail.length > 0
    ) {
      setRows([
        {
          id: Math.floor(Math.random() * 100000000000),
          code: data.code,
          fullName: data.fullName,
          address: data.address,
          school: data.school,
          mail: data.mail,
          dob: data.dob,
        },
        ...rows,
      ]);
      setOpenFormDialog(false);
      toast.success("Thêm sinh viên thành công!!", { autoClose: 2000 });
    } else {
      toast.error("Nhập đúng nhập đủ chưa mà đòi thêm??", { autoClose: 3000 });
    }
  };

  const handleUpdate = (data) => {
    if (data.id !== null) {
      setRows([
        {
          id: data.id,
          code: data.code,
          fullName: data.fullName,
          address: data.address,
          school: data.school,
          mail: data.mail,
          dob: data.dob,
        },
        ...rows.filter((item) => item.id !== data.id),
      ]);
      setOpenFormDialog(false);
      toast.success("Sửa thành công!", { autoClose: 2000 });
    } else {
      toast.error("Không sửa đâu!!!", { autoClose: 2000 });
    }
  };

  const handleDelete = (data) => {
    if (data.id) {
      setRows(rows.filter((item) => item.id !== data.id));
      setOpenConfirmDeleteDialog(false);
      toast.success("Xóa thành công!", { autoClose: 2000 });
    } else {
      toast.error("Lỗi rồi, không xóa đâu!!!");
    }
  };

  const handleDeleteAll = () => {
    let userFind = [];
    if (selection !== null) {
      rows.filter((item) => {
        if (!selection.includes(item.id)) {
          userFind.push(item);
        }
      });
      setRows(userFind);
      setOpenConfirmDeleteDialogAll(false);
      toast.success("Xóa thành công!");
    } else {
      toast.error("Lỗi rồi, có thấy ID đâu mà xóa!!!");
    }
  };

  const handleDisabledDeleteAll = () => {
    if (selection.length === 0) {
      return true;
    } else {
      return false;
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
                color="primary"
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
                color="primary"
                onClick={(rowData) => {
                  setCurrentData(rowData);
                  setTypeDele("deleAll");
                  setOpenConfirmDeleteDialogAll(true);
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
            submitData={(newData) =>
              newData.id ? handleUpdate(newData) : handleAddNew(newData)
            }
            currentData={currentData}
            rows={rows.map((item) => item)}
          />
        )}

        {openConfirmDeleteDialog && (
          <ConfirmationDialog
            open={openConfirmDeleteDialog}
            onConfirmDialogClose={() => setOpenConfirmDeleteDialog(false)}
            onYesClick={() => handleDelete(currentData)}
          />
        )}

        {openConfirmDeleteDialogAll && (
          <ConfirmationDialog
            typeDele={typeDele}
            open={openConfirmDeleteDialogAll}
            onConfirmDialogClose={() => setOpenConfirmDeleteDialogAll(false)}
            onYesClick={() => handleDeleteAll(selection)}
          />
        )}

        <DataGrid
          rows={rows.filter((data) => handleFilter(data))}
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