import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { handleUpdatePerson } from "../../store/actions/participants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AvatarFullScreen extends Component {
  inputFileComponet = "";
  constructor(props) {
    super(props);
    this.inputFileComponet = React.createRef();
    this.handlerUpdateImage = this.handlerUpdateImage.bind(this);
  }

  handlerUpdateImage = () => {
    this.inputFileComponet.current.click();
  };

  handlerFileSelected = evt => {
    evt.stopPropagation();
    evt.preventDefault();

    const file = evt.target.files[0];
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
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.props.handleUpdatePerson(personId,{ ...person,avatar:url });
          console.log("File available at", url);
        });
      })
      .catch(function(error) {
        // [START onfailure]
        console.error("Upload failed:", error);
        // [END onfailure]
      });

    // const selectedFile = e.target.files[0];
    // const reader = new FileReader();

    // const imgtag = document.getElementById("myimage");
    // imgtag.title = selectedFile.name;

    // reader.onload = function(event) {
    //   imgtag.src = event.target.result;
    // };

    // reader.readAsDataURL(selectedFile);
  };

  render() {
    const {
      handleClose,
      open,
      person: { firstName, officer, lastName, avatar },
      classes,
      isNotReady
    } = this.props;
    
    return (

      isNotReady ? <Fragment></Fragment>
      : <Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Details
              </Typography>
              <Button color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.imageContainer}>
            {/* <EditIcon className={classes.editIcon}/> */}
            <input
              id="upload"
              ref={this.inputFileComponet}
              className={classes.inputFile}
              onChange={this.handlerFileSelected}
              type="file"
              accept="image/*"
              multiple={false}
            />
            <img
              className={classes.image}
              src={avatar}
              alt={firstName}
              onClick={this.handlerUpdateImage}
            />

            <Typography variant="h6" className={classes.name}>
              {`${lastName}, ${firstName}`}
            </Typography>
            <Typography variant="h6" className={classes.name}>
              {`${officer ? officer : ""}`}
            </Typography>
          </div>
        </Dialog>
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
    minHeight: "70vh",
    width: "100%",
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

function mapStateToProps({ firestore: { data: { persons } } }, { personId } ) {
  const person = persons ? persons[personId] : null;
  return { isNotReady: !person, person: person ? person : {} };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleUpdatePerson }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "persons" }])
)(withStyles(styles)(AvatarFullScreen));
