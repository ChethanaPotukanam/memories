import React from 'react';
import {TextField , Grid , InputAdornment , IconButton} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from  "@mui/icons-material/VisibilityOff"

const Input = ({ name , handleChange , label , autoFocus , type , handleShowPassword }) => {
  return (
    <div>
      <Grid item xs={6} sm={12}>
        <TextField
          name={name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth 
          label={label}
          autoFocus={autoFocus}
          type={type}
          InputProps={{
            style: { height: "40px" }, 
            endAdornment:
              name === "password" ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      </Grid>
    </div>
  );
}

export default Input
