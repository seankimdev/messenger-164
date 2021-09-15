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
  img: (props) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: props.bubbleBorder,
  }),
  // senderUser: {
  //   borderRadius: "10px 10px 0 ",
  // },
  // senderOther: {
  //   borderRadius: "0 10px 10px 10px",
  // },
}));

const ImgComponent = (props) => {
  const { img, sender } = props;
  const bubbleBorder = sender === "user" ? "10px 10px 0 " : "0 10px 10px 10px";

  const styleProps = {
    bubbleBorder: bubbleBorder,
  };
  const classes = useStyles(styleProps);
  return <img className={classes.img} src={img} alt="attachment" />;
};

const ImageBubble = (props) => {
  const { imgs, sender } = props;
  const multiImgs = imgs.length > 1;

  const classes = useStyles();

  return (
    <Grid container className={classes.imgContainer}>
      {imgs.map((img) => {
        return (
          <Box
            key={img}
            className={`${classes.imgBubble} ${multiImgs && classes.imgMulti}`}
          >
            <ImgComponent sender={sender} img={img} />
          </Box>
        );
      })}
    </Grid>
  );
};

export default ImageBubble;
