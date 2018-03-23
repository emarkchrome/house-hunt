import { Router, Route, Switch } from 'inferno-router';
import browserHistory from './history';
import Auth from './auth';
import Home from './screens/Home/Home';
import Saved from './screens/Saved/Saved';
import Callback from './screens/shared/Callback/Callback';

const auth = new Auth();

const handleAuthentication = (props) => {
	if (/access_token|id_token|error/.test(browserHistory.location.hash)) {
		auth.handleAuthentication();
	}
}

const noMatch = () => <h3>404 Page Not Found</h3>;

const routes = (
  <Router history={ browserHistory }>
      <Switch>
				<Route exact path="/" component={ (props) => <Home auth={auth} history={ browserHistory } /> }/>
				<Route path="/saved" component={ (props) => {
					if (auth.isAuthenticated()) {
						return <Saved auth={auth} />
					} else {
						return <Home auth={auth} history={ browserHistory } redirected={true} />
					}
				} }/>
				<Route path="/callback" component={ (props) => {
					handleAuthentication(props);
					return <Callback auth={auth} {...props} />
				} } />
				<Route component={noMatch} />
			</Switch>
  </Router>
);

export default routes;
