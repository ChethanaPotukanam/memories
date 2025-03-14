import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, Chip } from "@mui/material";

import { getPosts, getPostBySearch } from "../../actions/posts";
import Paginate from '../Pagination';
import Form from "../forms/Form";
import Posts from "../posts/Posts";
import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search , setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost=()=>{
    if (search?.trim() || "" || tags?.length) {
      // dispatch --> fetch search post
      dispatch(getPostBySearch({ search, tags: tags?.join(",") || "" }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  }

  const handleKeyPress = (e) =>{
    if(e.keyCode === 13){ // key code 13 is for enter key
      searchPost();
    }
  }

  const handleChange = (event, newValue, reason) => {
    if (reason === "removeOption") {
      setTags(newValue); // Properly updates state on deletion
    } else if (reason === "selectOption" || reason === "createOption") {
      setTags(newValue); // Adds new tags
    }
  };

  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={7} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Stories"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]} // No predefined options
                  value={tags}
                  onChange={handleChange} // Handles both add & delete properly
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Search Tags"
                    />
                  )}
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper elevation={6} className={classes.pagination}>
                  <Paginate page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
