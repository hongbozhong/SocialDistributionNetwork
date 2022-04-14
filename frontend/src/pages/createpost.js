import React from 'react'

import Typography from '@mui/material/Typography';
import CssTextField from '../components/csstextfield'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axiosInstance from '../axiosinstance';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel'
import { fontSize } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

import { styled } from '@mui/system';
import $ from 'jquery'

const TextArea = styled('div')({
    padding: '5px',
    border:'solid 1px green', 
    borderRadius:'3px',
    width: 500, 
    color:'white',
    '&:hover': {
        borderColor: '#3CFF33',
    },
    '&:focus':{
        borderColor: '#3CFF33',
        borderCWidth: '2px',
        outline: 'none !important',
        boxShadow: '0 0 10px #3CFF33',
    },
    overflow: 'auto',
})

function ImageList({images}) {
    const htmlimages = [];
    for (var i=0; i<Math.min(images.length, 9); i++){
        htmlimages.push(<img src={URL.createObjectURL(images[i])} key={images[i].name} style={{margin: 10, width: 100}}/>);
    }
    return htmlimages;
}

class CreatePost extends React.Component{
    constructor(props){
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            content: "",
            images: null
        }
    }

    handleTextChange = (e) => {
        this.setState({
            content: $('#editable_div').text()
        });
        console.log(this.state);
    }

    handleFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('submit', this.state);
        if (this.state['content']){
            axiosInstance.post('/posts/', {'content': this.state.content})
                .then((res) => {
                    console.log('submit res', res);
                    console.log('submit files', this.state.images);
                    if (this.state.images){
                        for (var i=0; i<Math.min(this.state.images.length, 9); i++){
                            var formdata = new FormData();
                            formdata.append('postid', res.data.id);
                            formdata.append('image', this.state.images[i]);
                            axiosInstance.post('/postimages/', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
                                .then((res) => {
                                    window.location.href = '/';
                                });
                        }
                    }
                }).catch((error) => {
                    console.log('post create error:', error);
                })
            

        } else {
            alert('post content cannot be empty!');
        }
    }

    componentDidMount(){
        const content_id = 'editable_div';  
        const limit = 256;

        //limit the number of characters in TextArea 
        function check_charcount(content_id, limit, e) {
            const allowedKeys = (
                e.key === "Backspace" ||  
                e.key === 'End' || 
                e.key === 'Home' || 
                e.key === 'ArrowLeft' || 
                e.key === 'ArrowUp' || 
                e.key === 'ArrowRight' || 
                e.key === 'ArrowDown' || 
                e.key === 'Delete' || 
                e.ctrlKey === true && e.key === 'a' || 
                e.ctrlKey === true && e.key === 'x' || 
                e.ctrlKey === true && e.key === 'c' || 
                e.ctrlKey === true && e.key === 'v' || 
                e.ctrlKey === true && e.key === 'z'   
            )
            if(!allowedKeys && $('#'+content_id).text().length > limit){
                e.preventDefault();
            }
        }
        $('#'+content_id).keydown(function(e){ check_charcount(content_id, limit, e); });

        //set height of TextArea
        var fontsize = $('#'+content_id).css('font-size');
        var lineheight = Math.floor(parseInt(fontsize.replace('px','')) * 1.5);
        var paddingtop = parseInt($('#'+content_id).css('padding-top').replace('px',''));
        $('#'+content_id).css({'height':lineheight*20+paddingtop*2})
        $('img').css({'height':lineheight*2})

        //drag and drop
        var inputarea = document.getElementById('textarea');

        inputarea.addEventListener(
            "dragenter",
            function(e) {
                e.preventDefault();
            },
            false
        );

        inputarea.addEventListener(
            "dragover",
            function(e) {
                e.preventDefault();
            },
            false
        );

        inputarea.addEventListener(
            "drop",
            function(e) {
                dropHandler(e);
            },
            false
        );
        
        const imagebox = document.getElementById('image_box')
        var dropHandler = function(e) {
            e.preventDefault(); 
            console.log('hhhhh');
            var fileList = e.dataTransfer.files;
            if (fileList.length == 0) {
              return;
            }
            console.log(fileList);
            if (fileList[0].type.indexOf("image") === -1) {
              return;
            }
            var reader = new FileReader();
            var img = document.createElement("img");
            img.style.margin = '10px';
            img.style.width = '100px';
          
            reader.onload = function(e) {
              img.src = this.result;
              inputarea.appendChild(img);
            };
            reader.readAsDataURL(fileList[0]);
          };
          


    }

    render() {
        return (
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{display: 'flex', flexDirection: 'column', }}>
                <Tooltip title="Type here. You can insert images too" arrow placement='right'>
                    <TextArea id='textarea'>
                        <Typography 
                            id='editable_div'
                            name="content"
                            variant='body2' 
                            contentEditable="true" 
                            suppressContentEditableWarning={true} 
                            sx={{borderWidth:0, outline:0}}
                            onKeyUp={this.handleTextChange}
                        />
                        <Box id='image_box' sx={{display:'flex', width:'100%', flexWrap: 'wrap'}}>
                            { this.state.images && <ImageList images={this.state.images}/>}
                        </Box>
                    </TextArea>
                </Tooltip>

                <Button variant="contained" 
                        component='label' 
                        sx={{ m:1, width:100, bgcolor:'dodgerblue', fontSize:14, p:1 }}>
                    Upload images
                    <input
                        multiple
                        accept="image/*"
                        id="images"
                        name="images"
                        type="file"
                        onChange={this.handleFileChange}
                        hidden
                    />
                </Button>

                <Button
					type="submit"
					variant="contained"
					sx={{ m:1, width:100, bgcolor:'dodgerblue' }}
				>
					Submit
				</Button>
            </Box>
        )
    }
}




export default CreatePost