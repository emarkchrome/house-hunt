import { render } from 'inferno';
import Photo from './Photo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Photo />, div);
});
