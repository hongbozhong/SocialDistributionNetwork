import React from 'react';
import Posts from './components/posts';
import axiosInstance from './axios';



class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: null
		};
	}

	componentDidMount(){
		axiosInstance.get('posts').then((res) => {
			this.setState({posts: res.data})
		})
	}

	componentDidUpdate(){
		axiosInstance.get('posts').then((res) => {
			this.setState({posts: res.data})
		})
	}

	render(){
		return (
			<div className="App">
				<h1>Latest Posts</h1>
				<Posts posts={this.state.posts} />
			</div>
		)
	}
}


export default Home;