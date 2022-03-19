import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import Avatar from '@mui/material/Avatar'


export default function Post({ post, handleDelete }) {
    return (
        <div>
        <Card elevation={1}>
            <CardHeader
                avatar={
                    <Avatar>
                        {'P'}
                    </Avatar>}
                action={
                    <IconButton onClick={() => handleDelete(post.id)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={post.author}
                subheader={post.created_at}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    { post.content }
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
}