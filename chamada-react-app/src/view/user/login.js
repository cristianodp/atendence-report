import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { signIn } from "../../store/actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError , classes, auth} = this.props;

    if (auth.uid){
        return <Redirect to="/"/>
    } 

    return (
        
      <form onSubmit={this.handleSubmit} className={classes.container}>
        <Typography className={classes.title} variant="h4" noWrap>
          Chamada
        </Typography>
        <Typography className={classes.substitle} variant="h6" noWrap>
          Attendance Report
        </Typography>

        <TextField
          required
          id='email'
          onChange={this.handleChange} 
          label="email"
          defaultValue=""
          className={classes.email}
          margin="normal"
        />
        <TextField
          required
          id="password"
          onChange={this.handleChange} 
          label="password"
          type="password"
          defaultValue=""
          className={classes.passwd}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" className={classes.sigin}>
          Login
        </Button>
        <div className="center red-text">
          {authError ? <p>{authError}</p> : null}
        </div>
      </form>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    backgroundColor: "#666f86",
    height: "100vh",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  title: {
    marginTop: "20%"
  },
  email: {
    marginTop: "20%"
  },
  passwd: {
    marginTop: "8px"
  },
  sigin: {
    marginTop: "20%"
  }
};


const mapStateToProps = ({auth,firebase}) => {

    return{
      authError: auth.authError,
      auth:firebase.auth
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
