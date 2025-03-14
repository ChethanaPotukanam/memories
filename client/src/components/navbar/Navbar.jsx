import React, {useState , useEffect} from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate , useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "./styles.js";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem("profile");
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    const token = user?.token;
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      {/* Main Container for Flex Alignment */}
      <div className={classes.navContainer}>
        {/* Brand (Logo + Title) */}
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h5"
          >
            StoryBook
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="50"
          />
        </div>

        {/* Toolbar (Profile or SignIn) */}
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
