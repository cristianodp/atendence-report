import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import AttendanceReport from "./view/report/attendance-report";
import SchedulesView from "./view/schedules/schedules-view";
import AddOrEditSchedule from "./view/schedules/add-or-edit-schedule";
import AddPersonFromList from "./view/person/add-person-from-list";
import Login from "./view/user/login";
import PersonDetails from "./view/person/person-details";
import Report from "./view/report/report";
import { handlerInitialData } from "./store/actions/shared";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handlerInitialData());
  }
  render() {
    const { loading, isNotAuth } = this.props;

    return (
      <div className="App">
        <Fragment>
          <LoadingBar />
          {!loading && (
            <Switch>
              <Route exact path="/" component={SchedulesView} />
              <Route
                path="/schedule/:scheduleId/attendance"
                component={AttendanceReport}
              />
              <Route
                path="/schedule/add"
                component={AddOrEditSchedule}
              />
              <Route
                path="/person/add"
                component={AddPersonFromList}
              />
              <Route path="/login" component={Login} />
              <Route path="/persons/:personId" component={PersonDetails} />
              <Route path="/report" component={Report} />
              {/* <Route path="/:category" exact component={Dashboard} />
              <Route path="/:category/:id" component={PostPage} />  */}
            </Switch>
          )}
          {isNotAuth && <Redirect to="/login" />}
        </Fragment>
      </div>
    );
  }
}

function mapStateToProps({ loadingBar, firebase }) {
  return {
    loading: loadingBar ? loadingBar.default === 1 : true,
    isNotAuth: !firebase.auth.uid
  };
}

export default connect(mapStateToProps)(App);
