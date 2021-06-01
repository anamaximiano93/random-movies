import React, { createRef, forwardRef } from "react";
import { Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

/* function AlertProps(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} */

const AlertProps = forwardRef((props, ref) => {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

export default function AlertToast({
  text,
  type_,
  open,
  handleClose,
  handleCloseIcon,
}) {
  const vertical = "bottom";
  const horizontal = "left";
  const alert = createRef();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <AlertProps ref={alert} onClose={handleCloseIcon} severity={type_}>
        {text}
      </AlertProps>
    </Snackbar>
  );
}
