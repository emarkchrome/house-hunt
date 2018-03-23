import 'inferno';
import Component from 'inferno-component';
import './Photo.css';

class Photo extends Component {
  render() {
    return (
      <div className="photo ma1">
				<img className="photo" src={this.props.src} alt="mansion" />
			</div>
    );
  }
}

export default Photo;
