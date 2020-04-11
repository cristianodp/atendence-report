import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function MainMenu(props) {
  const classes = useStyles();

  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <List className={classes.list}>
        <Link to={"/"}>
          <ListItem button key={"Home"}>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link to={"/report"}>
          <ListItem button key={"Report"}>
            <ListItemText primary={"Report"} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
