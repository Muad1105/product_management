import Button from "@mui/material/Button";

const LogoutUserCheck = () => {
  const sendLogoutReq = async () => {
    console.log("send logout request");
    const res = await axios.post("http://localhost:1111/user/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable To Logout. Please Try Again");
  };

  const handleLogout = async () => {
    sendLogoutReq()
      .then(() => dispatch(userLogOut()))
      .then(() => navigate("/"));
  };

  return (
    <div className="fixed">
      <div>Please Logout before going back</div>
      <div className="flex gap-6">
        <Button variant="contained" size="small" onClick={() => handleLogout()}>
          Logout
        </Button>
        <Button variant="contained" size="small">
          Stay
        </Button>
      </div>
    </div>
  );
};

export default LogoutUserCheck;
