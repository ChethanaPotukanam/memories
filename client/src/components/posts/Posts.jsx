import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import useStyles from "./styles";
const Posts = ({setCurrentId}) => {
  const {posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  // console.log(posts);
  if (!posts.length && !isLoading) return "No posts";
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;

