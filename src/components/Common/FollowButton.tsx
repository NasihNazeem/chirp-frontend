import { Button } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../state/hooks";

const styles = {
  followButton: {
    backgroundColor: "primary.main",
    boxShadow: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      backgroundColor: "primary.dark",
      boxShadow: "none",
    },
    textTransform: "none",
  },
};

type FollowButtonProps = {
  setFollowStatus: Dispatch<SetStateAction<boolean>>;
  username: string;
};

const FollowButton = ({ setFollowStatus, username }: FollowButtonProps) => {
  const user = useAppSelector((state) => state.user);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.put(
        "http://localhost:3001/api/profile/followUser",
        {
          userId: user.userId,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFollowStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleFollow}
      size="small"
      sx={styles.followButton}
      variant="contained"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
