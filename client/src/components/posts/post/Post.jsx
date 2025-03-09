import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile")) || {};
  const userId = user?.result?.googleId || user?.result?._id;

  const hasLikedPost = post.likes.find((like) => like === userId)
  
  const handleLike = async() =>{
    dispatch(likePost(post._id));
    if( hasLikedPost ){
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardActionArea className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.name === post?.name ||
            user?.result?.name === post?.name) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => 
                {e.stopPropagation();
                setCurrentId(post._id)}}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          variant="h6"
          style={{ fontSize: "0.875rem" }}
          gutterBottom
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: "0.875rem" }} // 14px equivalent
          >
            {post.message}
          </Typography>
          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              disabled={!user?.result}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              <Likes />
            </Button>
            {(user?.result?.name === post?.name ||
              user?.result?.name === post?.name) && (
              <Button
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm("Are you sure you want to delete this post?")
                  ) {
                    dispatch(deletePost(post._id));
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
                Delete
              </Button>
            )}
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
