import 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import './SavedHousesButton.css';

export default class SavedHousesButton extends Component {
	loginPopup() {
		alert('Create an account to save your favorite houses! Click the register button to begin!');
	}
	render() {
		return (
			<span>
				{
					this.props.authenticated && (
						<Link to="/saved" className="link flex flex-column justify-center"><span className="white link dim bg-blue ph3 pv2">&#9829; Saved Houses</span></Link>
					)
				}
				{
					!this.props.authenticated && (
						<Link to="" onClick={this.loginPopup} className="link flex flex-column justify-center"><span className="white link dim bg-blue ph3 pv2">&#9829; Saved Houses</span></Link>
					)
				}
			</span>
		)
	}
}
