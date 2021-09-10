import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden,
} from "@material-ui/core";

import bgImage from "../src/images/bg-img.png";
import { ReactComponent as BubbleSvg } from "../src/images/bubble.svg";

import { login } from "./store/utils/thunkCreators";

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
  form: {
    width: "100%",
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

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

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
        <div className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography style={{ fontSize: "12px", color: "gray" }}>
                Don't have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => history.push("/register")}
                color="primary"
                className={`${classes.buttonSize} ${classes.buttonShadow}`}
              >
                Create account
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
            <form onSubmit={handleLogin} className={classes.form}>
              <Grid
                container
                direction="column"
                justify="center"
                align="center"
              >
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>

                <FormControl margin="normal" required>
                  <TextField
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>

                <Grid>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.buttonSize}
                    style={{ marginTop: "50px" }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
