import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "80vh",
    overflow: "auto",
    paddingRight: theme.spacing(3),
  },
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            imgs={message.attachments}
            time={time}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            imgs={message.attachments}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
