import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { Outlet } from "@mui/icons-material";
import { Button, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostForm(props) {
  const { userId, userName, refreshPosts } = props;

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseErrorSnackBar = (event, reason) => {
    console.log("lannn");

    if (reason === "clickaway") {
      console.log("heyyy");
      return;
    }

    setOpenErrorSnackBar(false);
    console.log("lannn");
  };

  const savePost = () => {
    fetch("/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  function handleSubmit() {
    if (text === "" || title === "") {
      setOpenErrorSnackBar(true);
      return;
    }
    savePost();
    refreshPosts();
    setIsSent(true);
    setTitle("");
    setText("");
    handleClick();
  }

  function handleTitle(value) {
    setTitle(value);
    setIsSent(false);
  }

  function handleText(value) {
    setText(value);
    setIsSent(false);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      {/* <Snackbar open={openErrorSnackBar} autoHideDuration={6000} onClose={handleCloseErrorSnackBar}>
        <Alert onClose={handleCloseErrorSnackBar} severity="error" sx={{ width: '100%' }}>
          This is a error message!
        </Alert>
       </Snackbar> */}
      <Card sx={{ width: 1400, textAlign: "left", margin: "20px" }}>
        <CardHeader
          avatar={
            <Link
              to={{ pathname: "/users/" + userId }}
              style={{
                textDecoration: "none",
                color: "white",
                boxShadow: "none",
              }}
            >
              <Avatar
                style={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                }}
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adormnet-amount"
              aria-multiline
              placeholder="title"
              inputProps={{ maxLenght: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            />
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {
              <OutlinedInput
                id="outlined-adormnet-amount"
                aria-multiline
                placeholder="text"
                inputProps={{ maxLenght: 250 }}
                fullWidth
                value={text}
                onChange={(i) => handleText(i.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                <Stack spacing={2} sx={{ width: '100%' }}>

                    <Button
                      variant="contained"
                      style={{
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                      }}
                      onClick={handleSubmit}
                    >
                      Post
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                    >
                      <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        This is a success message!
                      </Alert>
                    </Snackbar>
                 </Stack>   
                  </InputAdornment>
                }
              />
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
