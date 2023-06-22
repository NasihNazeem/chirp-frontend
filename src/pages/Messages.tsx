import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../components/Common/SearchBar";
import MessagesList from "../components/Messages/MessagesList";

const styles = {
  button: {
    borderRadius: 10,
    marginTop: 1,
  },
  messagesHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
    paddingBottom: 0,
  },
  messageListContainer: {
    maxWidth: "30%",
  },
  root: {
    width: "100%",
  },
  selectMessageContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "50%",
  },
};

const Messages = () => {
  return (
    <Stack
      direction="row"
      sx={styles.root}
      divider={<Divider orientation="vertical" />}
    >
      <Box sx={styles.messageListContainer}>
        <Box sx={styles.messagesHeader}>
          <Typography variant="h6">Messages</Typography>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Box>
        <SearchBar placeholder="Search Messages" />
        <Divider />
        <MessagesList />
      </Box>
      <Box sx={styles.selectMessageContainer}>
        <Typography variant="h6">Select a Message</Typography>
        <Typography>
          Choose one of your existing conversations or start a new one!
        </Typography>
        <Button variant="contained" sx={styles.button}>
          New Message
        </Button>
      </Box>
    </Stack>
  );
};

export default Messages;