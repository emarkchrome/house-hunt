import 'inferno';
import Component from 'inferno-component';
import './Callback.css';
import loader from './loader.svg';

export default class Callback extends Component {
	render() {
		return (
			<div class="loader loader--style5" title="4">
				<img src={loader} alt="spinner"></img>
			</div>
		)
	}
}
