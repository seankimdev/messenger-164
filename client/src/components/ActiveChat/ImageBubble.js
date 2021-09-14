import { Box, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
  imgBubble: {
    width: "120px",
    height: "120px",
  },
  imgMulti: {
    width: "90px",
    height: "70px",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  senderUser: {
    borderRadius: "10px 10px 0 ",
  },
  senderOther: {
    borderRadius: "0 10px 10px 10px",
  },
}));

const ImageBubble = (props) => {
  const classes = useStyles();
  const { imgs, sender } = props;

  const multiImgs = imgs.length > 1;

  return (
    <Grid container className={classes.imgContainer}>
      {imgs.map((img) => {
        return (
          <Box
            key={img}
            className={`${classes.imgBubble} ${multiImgs && classes.imgMulti}`}
          >
            <img
              className={`${classes.img} ${
                sender === "user" ? classes.senderUser : classes.senderOther
              }`}
              src={img}
              alt="attachment"
            />
          </Box>
        );
      })}
    </Grid>
  );
};

export default ImageBubble;
