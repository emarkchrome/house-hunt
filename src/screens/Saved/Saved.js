import 'inferno';
import Component from 'inferno-component';
import '../../registerServiceWorker';
import Menu from '../shared/Menu/Menu';
import './Saved.css';

export default class Saved extends Component {
	constructor() {
		super();
		this.state = { photos: [], noSavedPhotos: false };
	}
	componentDidMount() {
		console.log(this)
		this.props.auth.getCurrentUser((error, profile) => {
			if (error) {
				console.error('too many requests! ! !');
			} else {
				this.props.auth.getUser(profile.sub, userData => {
					if (userData.user_metadata) {
						this.setState({ photos: [].concat(userData.user_metadata.saved_houses) });
					} else {
						this.setState({ photos: [] });
					}
				});
			}
		});
	}
	async getPhotos() {
	}
  render() {
    return (
      <div className="container">
				<Menu auth={ this.props.auth } />
				<div className="Saved">
					{
						this.state.photos[0] && (
							<div className="photo-gallery">
								{ this.state.photos.map(photoUrl => {
									return (
										<div className="photo-mask">
											<a href={photoUrl} target="_blank"><img src={photoUrl} /></a>
										</div>
									)
								}) }
							</div>
						)
					}
					{
						!this.state.photos[0] && (
							<h2>You haven't saved any photos yet. Go to the homepage to save your favorite houses!</h2>
						)
					}
	      </div>
			</div>
    );
  }
}
