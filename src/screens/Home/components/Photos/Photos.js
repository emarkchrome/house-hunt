import 'inferno';
import Component from 'inferno-component';
import './Photos.css';
import x from './x.svg';
import check from './check.svg';
import Photo from './components/Photo/Photo';

export default class Photos extends Component {
	constructor() {
		super();
		this.state = { url: '', index: 0, noMorePhotos: false };
		this.save = this.save.bind(this);
		this.ignore = this.ignore.bind(this);
	}
	componentWillMount() {
		this.setState({ url: this.props.photos[0] });
	}
	save() {
		console.log('save image');
		this.props.auth.getCurrentUser((error, profile) => {
			console.log(profile);
			this.props.auth.setUserMetadata(profile.sub, this.props.photos[this.state.index])
		});
		this.nextPhoto();
	}
	ignore() {
		console.log('ignore image');
		this.nextPhoto();
	}
	nextPhoto() {
		if(this.state.index + 1 < this.props.photos.length) {
			this.setState({ url: this.props.photos[this.state.index + 1], index: this.state.index + 1 });
			console.log('case 1');
		} else {
			this.setState({ noMorePhotos: true });
			console.log('case 2');
		}
	}
  render() {
    return (
      <div className="container flex justify-center">
				{
					!this.state.noMorePhotos && (
						<div className="photos">
							<Photo src={this.state.url} />
							<div className="flex justify-center flex-row">
								<img src={x} alt="ignore" className="x w2 ph2 pointer:hover" onClick={this.ignore} />
								<img src={check} alt="save" className="check w2 ph2 pointer:hover" onClick={this.save} />
							</div>
						</div>
					)
				}
				{
					this.state.noMorePhotos && (
						<div className="photos">
							<h2>That's all the photos we have today. Come back tomorrow for new houses!</h2>
						</div>
					)
				}
			</div>
    );
  }
}
