import React from 'react';
import axiosInstance from '../components/axios';
import Post from '../components/post';
import Container from '@mui/material/Container'
import Masonry from '@mui/lab/Masonry';
import PrimarySearchAppBar from '../components/appbar'
import LeftFixedDrawer from '../components/drawer'


class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: null
		};

		this.drawerWidth = 240
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
			<>
				<PrimarySearchAppBar width={this.drawerWidth}/>
				<LeftFixedDrawer width={this.drawerWidth}/>
				<div sx = {{
					marginTop: this.drawerWidth
				}}>
					<Container>
						<Masonry columns={4} spacing={2}>
							{this.state.posts.map(post => (
								<div key={post.id}>
									<Post post={post} handleDelete={this.handleDelete} />
								</div>
							))}
						</Masonry>
					</Container>
				</div>
			</>
		)
	}
}


export default Home;