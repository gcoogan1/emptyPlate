import { makeStyles } from "@material-ui/core/styles";

//Reusable Funtions

//UpperCase First Letter Function
export const titleCase = str => {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

//Main Error Style --> top of page
 export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%;",
    "& > * + *": {
      marginTop: theme.spacing(1)
    },
    position: "absolute",
    textAlign: "center"
  }
}));


