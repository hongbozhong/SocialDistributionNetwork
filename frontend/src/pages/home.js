//mertail ui
import Container from '@mui/material/Container'
import Masonry from '@mui/lab/Masonry';
import Typography from '@mui/material/Typography';

//react 
import React from 'react';

//local
import axiosInstance from '../axiosinstance';
import Post from '../components/post';



class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: null
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount(){
		axiosInstance.get('/posts/').then((res) => {
			this.setState({posts: res.data});
		})
	}


	async handleDelete(id) {
		await axiosInstance.delete('/posts/');
		axiosInstance.get('/posts/').then((res) => {
			this.setState({posts: res.data});
		})
	  }
	
	
	render(){
		if (this.state.posts){
			return (
				<Masonry columns={4} spacing={2}>
					{this.state.posts.map(post => (
						<div key={post.id}>
							<Post post={post} handleDelete={this.handleDelete} />
						</div>
					))}
				</Masonry>
			)
		} else {
			return <Typography color='secondary'>there's no post here already!</Typography>
		}
	}
}


export default Home;