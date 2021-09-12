import React from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";

import { login, register } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },

  buttonSize: {
    width: "140px",
    height: "40px",
    marginTop: theme.spacing(4),
  },
}));

const Form = (props) => {
  const { login, register, pageParam } = props;

  const classes = useStyles();

  const isRegisterPage = pageParam === "register";

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  return isRegisterPage ? (
    <form onSubmit={handleRegister} className={classes.form}>
      <Grid container direction="column" justify="center" align="center">
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
            label="E-mail address"
            aria-label="e-mail address"
            type="email"
            name="email"
          />
        </FormControl>
        <FormControl margin="normal" required>
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="password"
          />
        </FormControl>
        <Grid>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.buttonSize}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  ) : (
    <form onSubmit={handleLogin} className={classes.form}>
      <Grid container direction="column" justify="center" align="center">
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
            spacing={3}
          >
            {isRegisterPage ? "Register" : "Login"}
          </Button>
        </Grid>
      </Grid>
    </form>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
