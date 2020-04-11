import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Box from "@material-ui/core/Box";

import AppToolBar from "../common/app-tool-bar";
import Schedules from "./schedules";

import { handleOnSearchSchedules } from "../../store/actions/schedules";

class SchedulesView extends Component {
  render() {
    const {handleOnSearchSchedules} = this.props
    return (
      <Box>
        <AppToolBar onSearch ={handleOnSearchSchedules}  />
        <Schedules />
      </Box>
    );
  }
}


function mapStateToProps({ schedule = {} }, props) {
  return {
    search: schedule.search ? schedule.search : ""
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleOnSearchSchedules }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulesView);

