import React from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions';
import { CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { Box } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import $ from 'jquery';


function ImageBoard({images}){
    //$(document).ready(function()
    $(function(){
        var w = Math.floor($('img').width()*0.75);
        $('img').css({'height':w});
    });
    return (
        <Box sx={{width:'100%'}}>
            <Box sx={{display: 'flex'}}>
                {images[0] && <img src={'http://localhost:8000/media/'+images[0]} style={{width:'32%', marginLeft:'1%', marginRight:'0.5%'}}/>}
                {images[1] && <img src={'http://localhost:8000/media/'+images[1]} style={{width:'32%', marginLeft:'0.5%', marginRight:'0.5%'}}/>}
                {images[2] && <img src={'http://localhost:8000/media/'+images[2]} style={{width:'32%', marginLeft:'0.5%', marginRight:'1%'}}/>}
            </Box>
            <Box style={{display: 'flex'}}>
                {images[3] && <img src={'http://localhost:8000/media/'+images[3]} style={{width:'32%', marginLeft:'1%', marginRight:'0.5%'}}/>}
                {images[4] && <img src={'http://localhost:8000/media/'+images[4]} style={{width:'32%', marginLeft:'0.5%', marginRight:'0.5%'}}/>}
                {images[5] && <img src={'http://localhost:8000/media/'+images[5]} style={{width:'32%', marginLeft:'0.5%', marginRight:'1%'}}/>}
            </Box>
            <Box style={{display: 'flex'}}>
                {images[6] && <img src={'http://localhost:8000/media/'+images[6]} style={{width:'32%', marginLeft:'1%', marginRight:'0.5%'}}/>}
                {images[7] && <img src={'http://localhost:8000/media/'+images[7]} style={{width:'32%', marginLeft:'0.5%', marginRight:'0.5%'}}/>}
                {images[8] && <img src={'http://localhost:8000/media/'+images[8]} style={{width:'32%', marginLeft:'0.5%', marginRight:'1%'}}/>}
            </Box>
        </Box>
    )
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(nextProps.post) === JSON.stringify(this.props.post) ? false:true;
    }

    render() {
        return (
            <>
                <Card elevation={1} sx={{}}>
                    <CardHeader
                        avatar={
                            <Avatar>
                                {'P'}
                            </Avatar>}
                        action={
                            <IconButton onClick={this.props.handleDelete}>
                                <DeleteOutlined />
                            </IconButton>
                        }
                        title={this.props.post.author_name}
                        subheader={this.props.post.created_at}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            { this.props.post.content }
                        </Typography>
                    </CardContent>
                    <ImageBoard images={this.props.post.images}/>
                    <CardActions>
                        <IconButton onClick={this.props.handleLikeChange}>
                            {this.props.post.like? <FavoriteOutlinedIcon />:<FavoriteBorderOutlinedIcon />}
                        </IconButton>
                        <Typography variant='body2'>{this.props.post.like_count}</Typography>
                        <IconButton>
                            {<ChatBubbleOutlineOutlinedIcon />}
                        </IconButton>
                        <Typography variant='body2'>{this.props.post.comment_count}</Typography>
                    </CardActions>
                </Card>
            </>
        )
    }
}

export default Post;