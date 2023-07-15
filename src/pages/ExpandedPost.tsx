import { Box, Divider } from "@mui/material";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";
import ComposeReply from "../components/Posts/ComposeReply";
import ExpandedPostReplies from "../components/Posts/ExpandedPostReplies";
import { useAppSelector } from "../state/hooks";
import Layout from "./Layout";

const styles = {
  root: {
    width: "100%",
  },
  divider: { marginBottom: 3 },
};

const ExpandedPost = () => {
  const expandedPost = useAppSelector((state) => state.expandedPost);

  return (
    <Layout
      mainContent={
        <Box sx={styles.root}>
          <ExpandedPostItem post={expandedPost} />
          <Divider sx={styles.divider} variant="middle" />
          <ComposeReply
            placeholder="Post your reply"
            parentPostId={expandedPost.postId}
          />
          <Divider />
          <ExpandedPostReplies post={expandedPost} />
        </Box>
      }
    />
  );
};

export default ExpandedPost;
