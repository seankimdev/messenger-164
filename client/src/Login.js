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
  Container,
  CssBaseline,
} from "@material-ui/core";
import bgImage from "../src/images/bg-img.png";

import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `linear-gradient(#3a8dff90, #86b9ff90), url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  // buttonPadding: {
  //   padding: "10px 30px",
  // },
  // media: {
  //   // height: 100,
  //   // paddingTop: "56.25%", // 16:9
  // },
  // card: {
  //   position: "relative",
  // },
  overlay: {
    color: "white",
    width: "70%",
    p: {
      fontSize: "25px",
    },
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
      {/* <CssBaseline /> */}
      <Grid
        container
        item
        xs={false}
        sm={5}
        className={classes.image}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item className={classes.overlay}>
          <Typography>Converse with anyone with any language</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography>Don't have an account?</Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => history.push("/register")}
                color="primary"
                variant="outlined"
                className={classes.buttonPadding}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
          <form onSubmit={handleLogin} className={classes.form}>
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
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.buttonPadding}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>

    // <Container>
    //   <Grid container justify="center">
    //     <Grid item xs={12} sm={3} justify="center">
    //       <Card className={classes.card}>
    //         <CardMedia
    //           component="img"
    //           image="../src/images/bg-img.png"
    //           className={classes.media}
    //         />
    //         <Box className={classes.overlay}>
    //           <Typography>Converse with anyone with any language</Typography>
    //         </Box>
    //       </Card>
    //     </Grid>

    //     <Grid item xs={12} sm={7}>
    //       <Container p={5}>
    //         <Grid container item>
    //           <Grid
    //             container
    //             direction="row"
    //             justifyContent="flex-end"
    //             alignItems="center"
    //             spacing={3}
    //           >
    //             <Grid item>
    //               <Typography>Don't have an account?</Typography>
    //             </Grid>
    //             <Grid item>
    //               <Button
    //                 onClick={() => history.push("/register")}
    //                 color="primary"
    //                 variant="outlined"
    //                 className={classes.buttonPadding}
    //               >
    //                 Create account
    //               </Button>
    //             </Grid>
    //           </Grid>
    //         </Grid>
    //         <form onSubmit={handleLogin}>
    //           <Grid>
    //             <Grid>
    //               <FormControl margin="normal" required>
    //                 <TextField
    //                   aria-label="username"
    //                   label="Username"
    //                   name="username"
    //                   type="text"
    //                 />
    //               </FormControl>
    //             </Grid>
    //             <FormControl margin="normal" required>
    //               <TextField
    //                 label="password"
    //                 aria-label="password"
    //                 type="password"
    //                 name="password"
    //               />
    //             </FormControl>
    //             <Grid>
    //               <Button
    //                 type="submit"
    //                 color="primary"
    //                 variant="contained"
    //                 className={classes.buttonPadding}
    //               >
    //                 Login
    //               </Button>
    //             </Grid>
    //           </Grid>
    //         </form>
    //       </Container>
    //     </Grid>
    //   </Grid>
    // </Container>
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
