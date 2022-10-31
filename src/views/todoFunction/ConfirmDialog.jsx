import React from "react";
import { Dialog, Button, DialogActions } from "@mui/material";

const ConfirmationDialog = ({ open, onConfirmDialogClose, onYesClick }) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div>
        <h2 className="text-padding">Thông báo!</h2>
        <p className="text-padding">Bạn muốn xóa sinh viên?</p>
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
