import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Checker from "../common/checker";
import AvatarFullScreen from "./avatar-full-screen";

import {
  handleUpdateAttendance,
  handleGetAttendanceList,
  extractAttendanceListFromFirestore
} from "../../store/actions/attendanceActions";

class ParticipantList extends Component {
  state = {
    openAvatarFullScreen: false,
    personIdSelected: null
  };

  handleToggle = (field, attendance) => () => {
    attendance[field] = !attendance[field];
    this.props.handleUpdateAttendance(attendance);
  };

  handleAvatarFullScreenClose = () => {
    this.setState({
      openAvatarFullScreen: false
    });
  };

  handleAvatarFullScreenShow = personId => () => {
    this.setState({
      openAvatarFullScreen: true,
      personIdSelected: personId
    });
  };

  update() {
    // this.props.handleCreatePerson();
  }

  render() {
    const { classes, list } = this.props;
    const { openAvatarFullScreen, personIdSelected } = this.state;

    return (
      <List className={classes.root}>
        <AvatarFullScreen
          handleClose={this.handleAvatarFullScreenClose}
          open={openAvatarFullScreen}
          personId={personIdSelected}
        />
        {list.length > 0 &&
          list.map(({ attendance, firstName, lastName, avatar, id }, idx) => (
            <Fragment key={idx}>
              <ListItem alignItems="flex-start"
                className={ attendance.sacramental === null || attendance.quorum === null ? classes.pendent : classes.updated}
                >
                <ListItemAvatar>
                  <Avatar
                    alt={firstName}
                    src={avatar}
                    className={classes.avatar}
                    onClick={() => this.props.history.push("/persons/" + id)}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={`${lastName}, ${firstName}`}
                  secondary={
                    <span className={classes.attendence}>
                      <Checker
                        title={"Sacramental?"}
                        onChange={this.handleToggle("sacramental", attendance)}
                        checked={attendance.sacramental}
                      />
                      <Checker
                        title={"Quorum?"}
                        onChange={this.handleToggle("quorum", attendance)}
                        checked={attendance.quorum}
                      />
                    </span>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
      </List>
    );
  }
}

const styles = {
  root: {
    width: "100%",
    maxWidth: "100%"
  },
  avatar: {
    margin: 10,
    width: 80,
    height: 80
  },
  updated:{
    backgroundColor: "#888888"
    , opacity: "0.2"
  },
  pendent:{

  }

};

function mapStateToProps({ firestore, participants }, { scheduleId }) {
  const { search } = participants;

  const list = extractAttendanceListFromFirestore(
    firestore.ordered,
    scheduleId
  );

  const filtred = list
    ? search
      ? list.filter(({ fullName }) => fullName.toUpperCase().includes(search))
      : list
    : [];

  const sorted = filtred.sort((a, b) => {
    if (a.lastName > b.lastName) return 1;
    else if (a.lastName < b.lastName) return -1;
    return 0;
  });

  return {
    list: sorted
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleUpdateAttendance,
      handleGetAttendanceList
    },
    dispatch
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "persons" }, { collection: "attendances" }])
)(withRouter(withStyles(styles)(ParticipantList)));
