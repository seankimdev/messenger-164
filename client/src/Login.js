import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper,
} from "@material-ui/core";
import Image from "../src/images/bg-img.png";

import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  // paperContainer: {
  //   backgroundImage: `url(${Image})`,
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  // },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
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
    <Paper className={classes.paper}>
      <Grid container justify="center">
        <Grid item xs={4}>
          <Box style={classes.paperContainer} height="100%" alignItems="center">
            <Typography>Converse with anyone with any language</Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Grid container item>
            <Typography>Need to register?</Typography>
            <Button onClick={() => history.push("/register")}>Register</Button>
          </Grid>
          <form onSubmit={handleLogin}>
            <Grid>
              <Grid>
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <FormControl margin="normal" required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid>
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
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
