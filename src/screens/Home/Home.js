import 'inferno';
import Component from 'inferno-component';
import '../../registerServiceWorker';
import Menu from '../shared/Menu/Menu';
import Photos from './components/Photos/Photos';
import './Home.css';

class Home extends Component {
	constructor() {
		super();
		this.state = { photos: null };
	}
	componentDidMount() {
		if(this.props.redirected) {
			alert('Create an account to save your favorite houses! Click the register button to begin!');
		}
		this.getPhotos()
			.then(res => { this.setState({ photos: <Photos auth={this.props.auth} photos={res} /> }) })
	}
	async getPhotos() {
		const response = await fetch('/api/get-images');
		const body = await response.json();
		return body.data;
		/*var result = [
			"https://s3.amazonaws.com/house-hot-or-not/cool_house.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house2.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house3.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house4.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house5.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house6.jpg"
		];
		return result;*/
	}
  render() {
		console.log(this.props);
    return (
      <div className="container">
				<Menu auth={ this.props.auth } />
				<div className="Home">
					{ this.state.photos }
					<h2 className="tc">Welcome to House Hunt! Click the X button to ignore houses you don't like, and click the check button to save them. I'll try to upload new ones every day. Log-in to save your photos. Warning: Don't click the checkmark too fast; take time to realize the home (also it causes an error)! <strong><a href="mailto:info@emmanuelmark.guru">Click here</a> to email me on what I can improve!</strong> - Mark</h2>
	      </div>
				<footer>
					<p className="tc small">House Hunt. Created by Emmanuel Mark. Thanks for your time!</p>
				</footer>
			</div>
    );
  }
}

export default Home;
