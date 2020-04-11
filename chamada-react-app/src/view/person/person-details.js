import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppToolBar from "../common/app-tool-bar";

import PictureSelector from "../common/picture-selector";

import { handleUpdatePerson } from "../../store/actions/participants";

class PersonDetails extends Component {
  state = { isPictureSelectorOpen: false };

  handlePictureSelectorOpen = () => {
    this.setState({
      isPictureSelectorOpen: true
    });
  };

  handlePictureSelectorClose = () => {
    this.setState({
      isPictureSelectorOpen: false
    });
  };

  handlePictureSelectorOnSave = file => {
    const metadata = {
      contentType: file.type
    };

    const {
      firebase: { storage },
      person,
      personId
    } = this.props;
    const storageRef = storage().ref();

    storageRef
      .child("images/" + file.name)
      .put(file, metadata)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          this.props.handleUpdatePerson(personId, { ...person, avatar: url });
          console.log("File available at", url);
        });
      })
      .catch(function(error) {
        // [START onfailure]
        console.error("Upload failed:", error);
        // [END onfailure]
      });
  };

  renderDetailsBody = ({ firstName, officer, lastName, avatar }, classes) => (
    <div className={classes.imageContainer}>
      <img
        className={classes.image}
        src={avatar}
        alt={firstName}
        onClick={this.handlePictureSelectorOpen}
      />

      <Typography variant="h6" className={classes.name}>
        {`${lastName}, ${firstName}`}
      </Typography>
      <Typography variant="h6" className={classes.name}>
        {`${officer ? officer : ""}`}
      </Typography>
    </div>
  );

  render() {
    const { person, classes, isReady } = this.props;
    const { isPictureSelectorOpen } = this.state;
    return (
      <Fragment>
        <AppToolBar />
        <PictureSelector
          isOpen={isPictureSelectorOpen}
          handleClose={this.handlePictureSelectorClose}
          onSave={this.handlePictureSelectorOnSave}
        />
        {isReady && this.renderDetailsBody(person, classes)}
      </Fragment>
    );
  }
}

const styles = {
  appBar: {
    position: "relative"
  },
  title: {
    flex: 1,
    alignSelf: "center"
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "16px"
  },
  image: {
    flexGrow: 1,
    objectFit: "contain",
    maxHeight: "70vh"
  },
  name: {
    flex: 1,
    alignSelf: "center"
  },
  editIcon: {
    float: "right"
  },
  inputFile: {
    display: "none"
  }
};

function mapStateToProps({ firestore }, { match }) {
  const { personId } = match ? match.params : "";
  const { persons } = firestore.data;
  const person = persons && personId ? persons[personId] : null;
  return { isReady: !!person, person: person ? person : {}, personId };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleUpdatePerson }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "persons" }])
)(withStyles(styles)(PersonDetails));
