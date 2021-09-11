import React from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Hidden,
  Box,
} from "@material-ui/core";

import bgImage from "../src/images/bg-img.png";
import { ReactComponent as BubbleSvg } from "../src/images/bubble.svg";

import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  bgImage: {
    backgroundImage: `linear-gradient(#3a8dffcc, #86b9ffcc), url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
  },
  formContainer: {
    padding: "10%",
  },

  overlay: {
    color: "white",
    width: "70%",
    textAlign: "center",
  },
  bubbleSvg: {
    width: "50px",
    marginBottom: "20px",
  },
  buttonSize: {
    width: "140px",
    height: "40px",
  },
  buttonShadow: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },
}));

const LandingPage = (props) => {
  const history = useHistory();
  const { user } = props;
  const { pageParam } = useParams();
  const toPage = pageParam === "register" ? "login" : "register";

  const classes = useStyles();

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Hidden only="xs">
        <Grid
          container
          item
          xs={false}
          sm={5}
          className={classes.bgImage}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            item
            direction="column"
            className={classes.overlay}
            alignItems="center"
          >
            <BubbleSvg className={classes.bubbleSvg} />
            <Typography>Converse with anyone with any language</Typography>
          </Grid>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={7}>
        <Box className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography style={{ fontSize: "12px", color: "gray" }}>
                {pageParam === "register"
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => history.push(`/landingpage/${toPage}`)}
                color="primary"
                className={`${classes.buttonSize} ${classes.buttonShadow}`}
              >
                {pageParam === "register" ? "Login" : "Create account"}
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            align="center"
            className={classes.formContainer}
          >
            <Typography
              variant="h6"
              style={{
                textAlign: "left",
                fontWeight: "800",
                marginTop: "50px",
              }}
            >
              Welcome back!
            </Typography>

            <Form pageParam={pageParam}> </Form>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(LandingPage);
