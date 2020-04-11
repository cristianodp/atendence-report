import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import AppToolBar from "../common/app-tool-bar";
import ParticipantList from "../person/participant-list";
import { handleOnSearchParticipants } from "../../store/actions/participants";


class MarkAttendance extends Component {
  render() {
    const {match,handleOnSearchParticipants,classes} = this.props
    const scheduleId =  match ? match.params.scheduleId : null
    return (
      <Box>
        <AppToolBar onSearch ={handleOnSearchParticipants} />
        { scheduleId && <ParticipantList scheduleId={scheduleId} />}
        <Link to={`/person/add`} className={classes.link}>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    );
  }
}

const styles = {
  link: {
    backgroudColor: "red",
    "a:hover": {
      backgroudColor: "blue"
    }
  },
  fab: {
    margin: 32,
    position: "fixed",
    bottom: 0,
    right: 0
  }
};


function mapStateToProps({ participants = {} }, props) {
  return {
    search: participants.search ? participants.search : ""
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleOnSearchParticipants }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MarkAttendance));



