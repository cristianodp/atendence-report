import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Redirect } from 'react-router-dom'

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import AppToolBar from "../common/app-tool-bar";
import { handleCreateSchedule } from "../../store/actions/schedules";

class AddOrEditSchedule extends Component {
  state = {
    date: "",
    status: "pending"
  };

  handleChangeDate = e => {
    const value = e.target.value;
    this.setState({ date: value });
  };

  handleChangeDescription = e => {
    const value = e.target.value;
    this.setState({ description: value });
  };

  onSaveSchedule = () => {
    const newSchedule = {
      createBy: this.props.user.email,
      createAt: new Date().toISOString(),
      ...this.state
    };

    this.props
      .handleCreateSchedule(newSchedule)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { classes } = this.props;
    // const

    return (
      <Box>
        <AppToolBar />
        <Container className={classes.content}>
          {/* <form className={classes.content}> */}
          <TextField
            id="filled-Date"
            label="Date"
            type="date"
            // dataDateFormat="DD MMMM YYYY"
            // className={classes.textField}
            value={this.state.date}
            onChange={this.handleChangeDate}
            margin="normal"
            variant="filled"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onSaveSchedule}
          >
            Save
          </Button>
          {/* </form> */}
        </Container>
      </Box>
    );
  }
}

const styles = {
  content: {
    display: "flex",
    flexDirection: "column"
  }
};

function mapStateToProps({ schedule = {}, firebase }, props) {
  return {
    search: schedule.search ? schedule.search : "",
    user: firebase.auth
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleCreateSchedule }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddOrEditSchedule));
