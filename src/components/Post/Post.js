import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function Post(props) {
    const { title, text , userId , userName} = props;

    const [expanded, setExpanded] = useState(false);
    const [likeButton , setLikeButton] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    function handleClickLikeButton(){
        setLikeButton(!likeButton);
    }
  

    return (
        <div className="postContainer">
            <Card sx={{ width: 1400 , textAlign: "left" , margin:"20px" }}>
                <CardHeader
                    avatar={
                    <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none", color: "white", boxShadow: "none" }} >
                        <Avatar style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }} aria-label="recipe"  >
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                    }
                   
                    title={title} 
                />
              
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                       {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleClickLikeButton}>
                        <FavoriteIcon  style={{color: likeButton ? "red" : ""}} />
                    </IconButton>
                   
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={true}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        lannnnnnnn
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default Post;
