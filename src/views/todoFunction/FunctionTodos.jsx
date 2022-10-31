import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DialogTodos from "./FunctionDialogTodos";

function TodoList(props) {

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div style={{ height: 400, width: "1100px" }}>
        <div className="btn">
          <Grid item container justify="space-between">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleShowDialog()}
              >
                Thêm Sinh Viên
              </Button>
            </Grid>
          </Grid>
        </div>
        {/* {openFormDialog && (
          <DialogTodos
            closeDialog={() =>
              this.setState({
                openFormDialog: false,
                type: "add",
              })
            }
            type="add"
            submitData={(newData) =>
              newData.id ? this.update(newData) : this.addNew(newData)
            }
            currentData={currentData}
          />
        )} */}

        {/* table */}
        {/* <DataGrid
          // rows={rows}
          // columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        /> */}
      </div>
    </>
  );
}

export default TodoList;
