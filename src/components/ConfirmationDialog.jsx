import React from "react";
import { Dialog, Button, DialogActions } from "@mui/material";

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  onYesClick,
  typeDele,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div>
        <h2 className="text-padding">Thông báo!</h2>
        <p className="text-padding">
          {typeDele === "delete"
            ? "Bạn muốn xóa sinh viên này?"
            : "Bạn muốn xóa các sinh viên này?"}
        </p>
        <DialogActions>
          <>
            <Button
              onClick={onConfirmDialogClose}
              variant="contained"
              color="secondary"
            >
              Hủy
            </Button>
            <Button onClick={onYesClick} variant="contained" color="primary">
              Xác nhận
            </Button>
          </>
        </DialogActions>
      </div>
    </Dialog>
  );
};
export default ConfirmationDialog;
