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


// handleUpdate = (data) => {
//   let currentData = this.state.rows;
//   if (data != null) {
//     currentData = currentData.filter((item) => {
//       if (item.id === data.id) {
//         this.setState({
//           rows: [
//             ...this.state.rows.filter((item) => (item.id !== data.id)),
//             {
//               id: data.id,
//               code: data.code,
//               fullName: data.fullName,
//               age: data.age,
//               address: data.address,
//               school: data.school,
//               mail: data.mail,
//               dob: data.dob,
//             },
//           ],
//           openFormDialog: false,
//         });
//       }
//     });
//     toast.success("Sửa thành công!", { autoClose: 2000 });
//   } else {
//     toast.error("Không sửa đâu!!!", { autoClose: 2000 });
//   }
//   console.log(">>>>>>", currentData);
// };
