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
		this.handleLikeChange = this.handleLikeChange.bind(this);
	}

	componentDidMount(){
		axiosInstance.get('/posts/', {params: {'public':true}}).then((res) => {
			this.setState({posts: res.data});
			console.log(this.state);
		})
	}

	handleDelete(i) {
		axiosInstance.delete('/posts/', {data:{'id':this.state.posts[i].id}})
		.then((res) => {
			return axiosInstance.get('/posts/', {params: {'public':true}});
		}).then((res) => {
			this.setState({posts: res.data});
		}).catch((error) => {
			console.log('post delete: ', error);
		})

	}

	handleLikeChange(i) {
		axiosInstance.post('/likes/', {'postid': this.state.posts[i].id});
		this.setState((prevState) => {
			const newState = JSON.parse(JSON.stringify(prevState));
			newState.posts[i].like = !prevState.posts[i].like
			newState.posts[i].like_count = prevState.posts[i].like_count + (prevState.posts[i].like ? -1:1)
			return newState
		})
	}
	
	
	render(){
		if (this.state.posts){
			return (
				<Masonry columns={{ xs: 1, sm: 3, lg:5 }} spacing={4} >
					{this.state.posts.map((post, i) => (
						<div key={post.id}>
							<Post post={post} handleDelete={() => this.handleDelete(i)} handleLikeChange={() => this.handleLikeChange(i)} />
						</div>
					))}
				</Masonry>
			);
		} else {
			return (<Typography color='secondary'>there's no post here already!</Typography>);
		}
	}
}


export default Home;