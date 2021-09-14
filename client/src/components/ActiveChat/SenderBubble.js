import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxHeight: "100vh",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  imgContainer: {
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
  imgBubble: {
    width: "100px",
  },
  img: {
    width: "100%",
    borderRadius: "10px 10px 0 ",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, imgs } = props;
  return (
    <Box className={classes.root}>
      {text ? (
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      ) : (
        ""
      )}
      <Grid container className={classes.imgContainer}>
        {imgs
          ? imgs.map((img) => {
              return (
                <Box key={img} className={classes.imgBubble}>
                  <img className={classes.img} src={img} alt="attachment" />
                </Box>
              );
            })
          : ""}
      </Grid>
      <Typography className={classes.date}>{time}</Typography>
    </Box>
  );
};

export default SenderBubble;
