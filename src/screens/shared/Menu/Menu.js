import 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import SavedHousesButton from './components/SavedHousesButton/SavedHousesButton';
import '../../../registerServiceWorker';
import './Menu.css';

class Menu extends Component {
	constructor() {
		super();
		this.state = { profile: {} };
	}
	componentDidMount() {
		if (this.props.auth.isAuthenticated()) {
			this.props.auth.getCurrentUser((err, profile) => {
				this.setState({ profile });
			});
		}
		/*let drop = new Drop({
			target: document.querySelector('.profile-img'),
  		content: this.returnAccountDropdown(),
  		position: 'bottom right',
  		openOn: 'click'
		});*/
	}
	login() {
		this.props.auth.login();
	}
	logout() {
		this.props.auth.logout();
	}
	getUser() {
		console.log('getting user data');
		this.props.auth.getUser(this.state.auth.profile.sub, function(userData) {
			console.log(userData);
		});
	}
  render() {
		const isAuthenticated = this.props.auth.isAuthenticated();
    return (
      <header className="header pv1 ph2 white flex flex-row justify-between w-100">
				<div className="flex flex-column justify-center">
					<Link to="/" className="link"><h2 className="link white">House Hunt</h2></Link>
				</div>
				<div className="flex flex-column justify-center">
						{
							!isAuthenticated && (
								<div className="flex flex-row justify-between">
									<SavedHousesButton authenticated={false} />
									<span onClick={this.login.bind(this)} className="white link dim bg-blue ph3 pv2">Login or Register</span>
								</div>
							)
						}
						{
							isAuthenticated && (
								<div className="flex flex-row justify-between">
									<SavedHousesButton authenticated={true} />
									{
										this.state.profile && (
											<img src={this.state.profile.picture} alt={this.state.profile.nickname} className="profile-img"></img>
										)
									}
									<span onClick={this.logout.bind(this)} className="white link dim bg-blue ph3 pv2">Logout</span>
								</div>
							)
						}
				</div>
      </header>
    );
  }
}

export default Menu;
