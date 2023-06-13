import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const tweetCommentsRender = (comments) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        minWidth: 300,
        bgcolor: "#51719a",
        margin: "0 auto",
        wordWrap: "break-word",
        wordBreak: "break-all",
      }}
    >
      {comments.map((comment) => (
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={comment.userImage} />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  nowrap="false"
                  color="text-secondary"
                >
                  {comment.username + " says: "}
                  {comment.text}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
