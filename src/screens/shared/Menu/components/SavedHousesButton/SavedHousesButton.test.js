import { render } from 'inferno';
import SavedHousesButton from './SavedHousesButton';

it('should render without crashing', () => {
	const div = document.createElement('div');
	render(<SavedHousesButton />, div);
});
