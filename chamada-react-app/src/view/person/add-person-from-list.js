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
import IconButton from '@material-ui/core/IconButton';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import AppToolBar from "../common/app-tool-bar";

import {
    handleOnSearchProspect,
    handleCreatePerson
} from "../../store/actions/participants";

class AddPersonFromList extends Component {
    handlerOnAddOrRemove = (added, person) => () => {
        if (!added) {
            this.props.handleCreatePerson(person);
            window.history.back();
        }
    };

    render() {
        const { classes, list, handleOnSearchProspect } = this.props;

        return (
            <Fragment>
                <AppToolBar onSearch={handleOnSearchProspect} />
                <List className={classes.root}>
                    {list.length > 0 &&
                        list.map(({ firstName, lastName, added }, idx) => (
                            <Fragment key={idx}>
                                <ListItem alignItems='flex-start'>
                                    <ListItemText
                                        primary={`${lastName}, ${firstName}`}
                                    />
                                    <IconButton
                                        onClick={this.handlerOnAddOrRemove(
                                            added,
                                            {
                                                firstName,
                                                lastName
                                            }
                                        )}
                                    >
                                        {!added ? <AddIcon /> : <RemoveIcon />}
                                    </IconButton>
                                </ListItem>
                                <Divider variant='inset' component='li' />
                            </Fragment>
                        ))}
                </List>
            </Fragment>
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
    }
};

function mapStateToProps({ firestore = {}, participants }) {
    const { ordered } = firestore;
    const { searchProspect = "" } = participants;

    return {
        list: ordered.prospects
            ? ordered.prospects
                  .filter(filter =>
                      `${filter.firstName} ${filter.lastName}`.includes(
                          searchProspect
                      )
                  )
                  .map(prospect => {
                      return {
                          ...prospect,
                          added:
                              ordered.persons.filter(
                                  filter =>
                                      filter.firstName === prospect.firstName &&
                                      filter.lastName === prospect.lastName
                              ).length > 0
                      };
                  })
                  .sort((a, b) => {
                      if (a.firstName < b.firstName) return 1;
                      else if (a.firstName > b.firstName) return -1;
                      return 0;
                  })
            : []
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            handleOnSearchProspect,
            handleCreatePerson
        },
        dispatch
    );

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "prospects" }, { collection: "persons" }])
)(withRouter(withStyles(styles)(AddPersonFromList)));
