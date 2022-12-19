import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "./ConfirmDialog";
import DialogTodos from "./Dialog";
import loading from "../../assets/img/loading.gif";

import {
  getListPost as getListPostAction,
  deletePostData as deleteListPostAction,
} from "./actions";

function App(props) {
  const { posts, load } = props.posts;
  console.log(
    ">>>",
    posts.map((item) => item)
  );

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [type, setType] = useState("");
  const [typeDele, setTypeDele] = useState("");
  const [openConfirmDeleteAll, setOpenConfirmDeleteAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    props.getListPost();
  }, []);

  const handleDelete = (idData) => {
    const idDelete = idData.id;
    props.deletePostData(idDelete);
    setOpenConfirmDeleteDialog(false);
  };

  const handleDisabledDeleteAll = () => {};

  const handleDeleteALL = () => {};

  const handleFilter = (data) => {
    // console.log(data)
    if (searchValue === "") return data;
    if (
      data.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.title
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
      data.description
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
      data.category
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
      data.price.toLowerCase().includes(searchValue.toLowerCase())
    )
      return data;
  };

  if (load) {
    return (
      <div>
        <h3 style={{ textAlign: "center", color: "#000" }}>
          Data is loading from API...
        </h3>
        <img src={loading} />
      </div>
    );
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 60,
      editable: true,
      renderCell: (rowData) => {
        return (
          <>
            <Avatar src={rowData.value} sx={{ width: 45, height: 45 }} />
          </>
        );
      },
    },
    {
      field: "category",
      headerName: "Danh mục",
      editable: true,
      minWidth: 150,
    },
    {
      field: "title",
      headerName: "Tên sản phẩm",
      editable: true,
      minWidth: 200,
    },
    {
      field: "description",
      headerName: "Thông tin",
      editable: true,
      minWidth: 150,
    },
    { field: "price", headerName: "Giá bán $", editable: true, minWidth: 50 },
    {
      field: "rating",
      headerName: "Số Lượng",
      editable: true,
      minWidth: 50,
      valueGetter: (params) => `${params.row.rating.count || ""}`,
    },
    // {
    //   field: "rating",
    //   headerName: "Xếp hạng",
    //   editable: true,
    //   minWidth: 50,
    //   valueGetter: (params) => `${params.row.rating.rate || ""}`,
    // },
    // {
    //   field: "address",
    //   headerName: "Địa chỉ",
    //   editable: true,
    //   minWidth: 200,
    //   valueGetter: (params) =>
    //     `${params.row.address.suite || ""} -
    //     ${params.row.address.street || ""} -
    //     ${params.row.address.city || ""}`,
    // },
    // {
    //   field: "company",
    //   headerName: "Công ty",
    //   minWidth: 180,
    //   editable: true,
    //   valueGetter: (params) => `${params.row.company.name || ""}`,
    // },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 140,
      editable: true,
      renderCell: (rowData) => {
        return (
          <>
            <Button>
              <RemoveRedEyeIcon
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
      <div
        style={{
          display: "flex",
          height: "100%",
          color: "#000",
          paddingTop: "50px",
        }}
      >
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
                Thêm Sản Phẩm
              </Button>
            </Grid>
            {/* <Grid item>
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
            </Grid> */}
          </Grid>
          <Grid item xs={4} className="padding">
            {/* <TextField
              value={searchValue}
              size="small"
              placeholder="Tìm kiếm..."
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchValue(e.target.value)}
            /> */}
          </Grid>
        </Grid>
      </div>
      <div style={{ flexGrow: 3, minWidth: "1000px", height: "400px" }}>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .MuiDataGrid-cell--editable": {
              backgroundColor: (theme) =>
                theme.palette.mode === "d" ? "#d9f3be" : "rgb(217 243 190)",
            },
          }}
        >
          <DataGrid
            rows={posts.filter((data) => handleFilter(data))}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            // // Tạo màu cho rows
            isCellEditable={(params) => params.row.id % 2 !== 0}
            // // Ghim cột actions => MUI ver pro
            // initialState={{ pinnedColumns: { right: ["actions"] } }}
            // checkboxSelection={true}
            // onSelectionModelChange={(id) => {
            //   setSelection(id);
            // }}
          />
        </Box>
      </div>

      {openFormDialog && (
        <DialogTodos
          closeDialog={() => setOpenFormDialog(false)}
          type={type}
          // submitData={(newData) =>
          //   newData.id ? handleUpdate(newData) : handleAddNew(newData)
          // }
          currentData={currentData}
          // rows={rows.map((item) => item)}
        />
      )}

      {openConfirmDeleteDialog && (
        <ConfirmationDialog
          open={openConfirmDeleteDialog}
          onConfirmDialogClose={() => setOpenConfirmDeleteDialog(false)}
          onYesClick={() => handleDelete(currentData)}
          typeDele={typeDele}
        />
      )}

      {openConfirmDeleteAll && (
        <ConfirmationDialog
          open={openConfirmDeleteAll}
          onConfirmDialogClose={() => setOpenConfirmDeleteAll(false)}
          onYesClick={() => handleDeleteALL(currentData)}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListPost: (params) => dispatch(getListPostAction(params)),
    deletePostData: (params) => dispatch(deleteListPostAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
