import React , {useState , useEffect} from "react";
import {useSelector} from "react-redux";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from "./styles";
import { createPost , updatePost } from '../../actions/posts';
import { useNavigate } from "react-router-dom";
const Form = ({currentId , setCurrentId}) => {
  const [postData , setPostData] = useState({
    title:'' , message:'' , tags:'' , selectedFile:''
  })
  const post = useSelector((state)=>
            currentId ? state.posts.posts.find((p) => p._id ===currentId) : null                     
  )
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])

  const handleSubmit = (e) => {
      e.preventDefault();
      if(currentId){
        dispatch(
          updatePost(currentId, { ...postData, name: user?.result?.name }, navigate)
        );
      }else{
        dispatch(createPost({...postData, name:user?.result?.name}));
      }
      clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please SignIN to create your own stories and like other's stories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId? 'Edit' : 'Creating'} a Story</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth
          value={postData.title}
          onChange={(e)=>setPostData({...postData , title:e.target.value})} />
        <TextField name="message" variant="outlined" label="Message" fullWidth
          value={postData.message}
          onChange={(e)=>setPostData({...postData , message:e.target.value})} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth
          value={postData.tags}
          onChange={(e)=>setPostData({...postData , tags:e.target.value.split(',')})} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false}
            onDone={({base64})=>setPostData({...postData , selectedFile:base64})}/>          
        </div>
        <Button className={classes.buttonSubmit} variant="contained" 
          color="primary" size="medium" type="submit" fullWidth>
            Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper> 
  );
};


export default Form;
