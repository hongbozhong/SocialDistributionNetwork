import React from 'react';
import axiosInstance from '../components/axios';
import Post from '../components/post';
import Container from '@mui/material/Container'
import Masonry from '@mui/lab/Masonry';


class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: null
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount(){
		axiosInstance.get('posts').then((res) => {
			this.setState({posts: res.data});
		})
		console.log(this.state.posts);
	}

	componentDidUpdate(){
		axiosInstance.get('posts').then((res) => {
			this.setState({posts: res.data});
		})
		console.log(this.state.posts);
	}

	async handleDelete(id) {
		await axiosInstance.delete('posts');
		axiosInstance.get('posts').then((res) => {
			this.setState({posts: res.data});
		})
	  }
	

	render(){
		return (
			<Container>
				<Masonry columns={4} spacing={2}>
					{this.state.posts.map(post => (
						<div key={post.id}>
							<Post post={post} handleDelete={this.handleDelete} />
						</div>
					))}
				</Masonry>
			</Container>
		)
	}
}


export default Home;