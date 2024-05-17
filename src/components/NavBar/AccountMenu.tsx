import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack/Stack";
import React from "react";
import { useAppSelector } from "../../state/hooks";
import LogoutIcon from "@mui/icons-material/Logout";

const styles = {
  button: {
    marginTop: "auto",
    marginBottom: 2,
  },
  nameContainer: { paddingLeft: 2, textAlign: "left" },
  popover: {
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "10px", // Rounded corners
  },
  popoverButton: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "20px",
    paddingLeft: "20px",
    textTransform: "none",
  },
  popoverIcon: {
    marginRight: "10px",
  },
};

const AccountMenu = () => {
  const { logout } = useAuth0();
  const user = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button onClick={handleClick} sx={styles.button}>
        <Avatar />
        <Stack sx={styles.nameContainer}>
          <Typography>{user.displayName}</Typography>
          <Typography>{`@${user.username}`}</Typography>
        </Stack>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ ".MuiPopover-paper": styles.popover }}
      >
        <Button
          sx={styles.popoverButton}
          component={Link}
          onClick={() => logout()}
        >
          <LogoutIcon sx={styles.popoverIcon}></LogoutIcon>
          Log Out
        </Button>
      </Popover>
    </>
  );
};

export default AccountMenu;
