import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

class Checker extends Component {
  render() {
    const { classes, title, onChange, checked } = this.props;

    return (
      <span className={classes.container}>
        <Typography
          component="span"
          variant="body2"
          className={classes.inside}
          color="textPrimary"
        >
          {title}
        </Typography>

        <Switch
          edge="end"
          onChange={onChange}
          checked={checked}
          inputProps={{
            "aria-labelledby": "switch-list-label-wifi"
          }}
        />
      </span>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  inside: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
};

export default withStyles(styles)(Checker);
