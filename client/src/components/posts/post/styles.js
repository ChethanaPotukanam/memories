import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 15,
    height: "100%",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9 aspect ratio
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useStyles;
