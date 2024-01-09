import React from "react";
import Button from "@mui/material/Button";

const UserAccountNavbarPopup = () => {
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#333", color: "gray" }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserAccountNavbarPopup;
