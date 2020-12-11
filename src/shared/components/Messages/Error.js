import React from "react";
import Alert from "@material-ui/lab/Alert";

function Error({ children }) {
  return (
    <Alert
      style={{ backgroundColor: "#a93224" }}
      variant="filled"
      severity="error"
    >
      {children}
    </Alert>
  );
}

export default Error;
