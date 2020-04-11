import React, { Component } from "react";

import CameraIcon from "@material-ui/icons/CameraAlt";
import FileIcon from "@material-ui/icons/Filter";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import DialogFullScreen from "./dialog-full-screen";

class PictureSelector extends Component {
  state = { mode: "select" };
  inputFile = "";
  imagePreview = "";
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
    this.imagePreview = React.createRef();
    this.handlerOpenGaleryImage = this.handlerOpenGaleryImage.bind(this);
  }

  handlerOpenGaleryImage = () => {
    this.inputFile.current.click();
   
  };

  handlerOpenCamera = () => {
    this.setState({ mode: "camera" });
  };

  handlerFileSelected = evt => {

    this.setState({ mode: "preview" });

    evt.stopPropagation();
    evt.preventDefault();
    
    const file = evt.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = e => {
      this.imagePreview.current.src = e.target.result
    };

  };

  handlerOnConfirm = () => {
    this.props.onSave && this.props.onSave(this.inputFile.current.files[0]);
    this.props.handleClose();
  };

  handlerOnCancel = () => {
    this.props.handleClose();
  };

  clear = () => {
    this.inputFile.current.value = "";
    this.imagePreview.current.src = "";
  };

  onTakePhoto(dataUri) {
    // Do stuff with the dataUri photo...
    // debugger
    this.imagePreview.current.src = dataUri;
    console.log("takePhoto", dataUri);
    this.setState({ mode: "preview" });
  }

  render() {
    const { classes, isOpen } = this.props;
    const { mode } = this.state;

    return (
      <DialogFullScreen
        open={isOpen}
        title={"Picture Selector"}
        onClose={this.handlerOnCancel}
        onSave={this.handlerOnConfirm}
      >
        <Container className={classes.root}>
          <h3>Choose the option:</h3>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={this.handlerOpenCamera}
            >
              Camera
              <CameraIcon className={classes.rightIcon} />
            </Button>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={this.handlerOpenGaleryImage}
            >
              Galary
              <FileIcon className={classes.rightIcon} />
            </Button>
          </div>
          <div className={classes.preview}>
            {mode === "camera" && (
              <Camera
                className={classes.imagePreview}
                onTakePhoto={dataUri => {
                  this.onTakePhoto(dataUri);
                }}
              />
            )}

            {mode === "preview" && (
              <img
                className={classes.imagePreview}
                ref={this.imagePreview}
                alt="preview"
              />
            )}
          </div>
          <input
            id="upload"
            ref={this.inputFile}
            className={classes.inputFile}
            onChange={this.handlerFileSelected}
            type="file"
            accept="image/*"
            multiple={false}
          />
        </Container>
      </DialogFullScreen>
    );
  }
}

const styles = {
  root: {
    textAlign: "center"
  },
  inputFile: {
    display: "none"
  },
  buttons: {},
  button: {
    margin: "8px"
  },
  rightIcon: {
    marginLeft: "8px"
  },
  preview: {
    minHeight: "300px",
    background: "#e0e0e0e0",
    padding: "8px",
    display: "flex"
  },
  imagePreview: {
    objectFit: "contain",
    width: "100%"
  },
  hide: {
    display: "none"
  }
};

export default withStyles(styles)(PictureSelector);
