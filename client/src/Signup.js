import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
  Hidden,
} from "@material-ui/core";

import bgImage from "../src/images/bg-img.png";
import { ReactComponent as BubbleSvg } from "../src/images/bubble.svg";

import { register } from "./store/utils/thunkCreators";
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
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
                Already have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => history.push("/login")}
                color="primary"
                className={`${classes.buttonSize} ${classes.buttonShadow}`}
              >
                Login
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
              Create an account.
            </Typography>
            <form onSubmit={handleRegister} className={classes.form}>
              <Grid
                container
                direction="column"
                justify="center"
                align="center"
              >
                <FormControl required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>

                <FormControl required>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                  />
                </FormControl>

                <FormControl
                  required
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  required
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
                <Grid>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.buttonSize}
                    style={{ marginTop: "50px" }}
                  >
                    Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
