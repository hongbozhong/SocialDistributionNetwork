import React from 'react'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axiosInstance from '../axiosinstance';
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
    //'& #editable_div:focus':{
    //    borderCWidth: '2px',
    //    boxShadow: '0 0 10px #3CFF33',
    //},
    overflow: 'auto',
})

function ImageList({images}) {
    const htmlimages = [];
    console.log(images);
    for (var i=0; i<Math.min(images.length, 9); i++){
        htmlimages.push(<img src={URL.createObjectURL(images[i])} key={images[i].name+i.toString()} style={{margin: 10, width: 100, height: 75}}/>);
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
            images: []
        }
    }

    handleTextChange = (e) => {
        this.setState({
            content: $('#editable_div').text()
        });
        console.log(this.state);
    }

    handleFileChange = (e) => {
        console.log(e.target.files);
        const files = [];
        for (var i=0; i<Math.max(0, Math.min(e.target.files.length, 9-this.state.images.length)); i++){
            files.push(e.target.files[i]);
        }
        this.setState({
            images: this.state.images.concat([...files])
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
        const textinputid = 'editable_div';  
        const inputareaid = 'textarea';
        const limit = 256;

        //limit the number of characters in TextArea 
        function check_charcount(textinputid, limit, e) {
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
            if(!allowedKeys && $('#'+textinputid).text().length > limit){
                e.preventDefault();
            }
        }
        $('#'+textinputid).on('keydown', (
            (e) => { check_charcount(textinputid, limit, e); })
        );

        //set height of TextArea and image
        var fontsize = $('#'+textinputid).css('font-size');
        var lineheight = Math.floor(parseInt(fontsize.replace('px','')) * 1.5);
        var paddingtop = parseInt($('#'+textinputid).css('padding-top').replace('px',''));
        console.log('lineheight', lineheight);
        $('#'+textinputid).css({'height':lineheight*20+paddingtop*2})

        //add css to textarea when its children textinput is focused
        $('#'+textinputid)
            .on('focus', ()=>{
                $('#'+inputareaid).css({borderWidth: '2px', boxShadow: '0 0 10px #3CFF33'});
            })
            .on('blur', ()=>{
                $('#'+inputareaid).css({borderWidth: '1px', boxShadow: ''});
            })

        //drag and drop image
        $('#'+inputareaid)
        .on('dragover', false)
        .on('drop', 
            (e => {
                e.preventDefault(); 
                const origin_e = e.originalEvent;
                var fileList = origin_e.dataTransfer.files;
                if (fileList.length == 0) {
                    return;
                }
                if (fileList[0].type.indexOf("image") === -1) {
                    return;
                }
                
                const files = []
                for (var i=0; i<Math.max(0, Math.min(fileList.length, 9-this.state.images.length)); i++){
                    files.push(fileList[i]);
                }
                this.setState({
                    images: this.state.images.concat([...files])
                })
                /*
                var reader = new FileReader();
                reader.onload = function(origin_e) {
                    
                    $('#image_box').append($(document.createElement('img'))
                                            .css({'margin':'10px', 'width':'100px'})
                                            .attr('src', this.result)
                                            )
                    
                   
                };
                reader.readAsDataURL(fileList[0]);
                */
                return false;
                }
            )
        );



    }

    render() {
        return (
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{display: 'flex', flexDirection: 'column', }}>
                <Tooltip title={<p style={{fontSize:15 }}>Type here. You can drag images here too</p>} 
                        arrow 
                        placement='right' 
                    >
                    <TextArea id='textarea'>
                        <Typography 
                            id='editable_div'
                            name="content"
                            variant='body2' 
                            contentEditable="true" 
                            suppressContentEditableWarning={true} 
                            sx={{borderWidth:0, outline:0 }}
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