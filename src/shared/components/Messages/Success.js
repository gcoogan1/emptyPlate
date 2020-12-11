import React from "react";
import Alert from "@material-ui/lab/Alert";


function Sucess({ children }) {
  return (
    <Alert
      style={{ backgroundColor: "#C5E9D1" , color: "#0EBC3D", textAlign: "center"}}
      variant="filled"
      severity="sucess"
    >
      {children}
    </Alert>
  );
}

export default Sucess;