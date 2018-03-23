import 'inferno-devtools';
import { render } from 'inferno';
import routes from './routes';
import './tachyons.min.css';
import './index.css';

render(routes, document.getElementById('app'));
