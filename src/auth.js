import Auth0 from 'auth0-js';
import history from './history';
let request = require('request');

export default class Auth {
	constructor() {
		console.log(process.env);
		this.auth0 = new Auth0.WebAuth({
			domain: 'emarkchrome.auth0.com',
	    clientID: 'yhAG6j4c0lzaz9KonIaLdK6c5Iy1t5YN',
	    redirectUri: 'https://house-hunt-online.herokuapp.com/callback',
	    audience: 'https://emarkchrome.auth0.com/userinfo',
	    responseType: 'token id_token',
	    scope: 'openid profile'
		});

		this.login = this.login.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.getAccessToken = this.getAccessToken.bind(this);
		this.getManagementAPIAccessToken = this.getManagementAPIAccessToken.bind(this);
		this.getUser = this.getUser.bind(this);
		this.setUserMetadata = this.setUserMetadata.bind(this);
		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.logout = this.logout.bind(this);
		this.setSession = this.setSession.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.currentUser = {};
		this.userProfile = {};
		// Prevents 429 errors with Auth0
		this.requestCooldown = {
			on: false,
			degree: 1
		};
		this.requestCooldownInitiator = this.requestCooldownInitiator.bind(this);
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

	getAccessToken() {
		console.log(localStorage.getItem('access_token'));
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken) {
			throw new Error ('No access token');
		}
		return accessToken;
	}

	getManagementAPIAccessToken(cb) {
		var options = { method: 'POST',
		  url: 'https://emarkchrome.auth0.com/oauth/token',
		  headers: { 'content-type': 'application/json' },
		  body: '{"client_id":"4OlwXJQYVWsZnuTMAqfVZZq56picPtd7","client_secret":"AEZXyyH-CsvWc_AciVycM6uTFtBfdjG6aq8CKM5auIvj7xQIRR5lCh5FMHoai4PW","audience":"https://emarkchrome.auth0.com/api/v2/","grant_type":"client_credentials"}'
		};

		request(options, cb);
	}

	requestCooldownInitiator(cb) {
		if(this.requestCooldown.on) {
			setTimeout(() => {
				cb();
				this.requestCooldown.degree = this.requestCooldown.degree + 1;
			}, 3000 * this.requestCooldown.degree);
		} else {
			cb();
			this.requestCooldown.on = true;
			setTimeout(() => {
				this.requestCooldown.on = false;
				this.requestCooldown.degree = 1;
			}, 1000);
		}
	}

	getUser(userId, cb) {
		let auth0Manage;
		this.getManagementAPIAccessToken(function(error, response, body) {
			var key = JSON.parse(response.body).access_token;
			auth0Manage = new Auth0.Management({
				domain: 'emarkchrome.auth0.com',
				token: key,
				audience: 'https://emarkchrome.auth0.com/api/v2/'
			});
			if(this.userProfile = {}) {
				auth0Manage.getUser(userId, (error, data) => {
					if (error) {
						throw new Error(error)
					}
					cb(data);
					this.userProfile = data;
				});
			} else {
				cb(this.userProfile);
			}

		});
	}

	setUserMetadata(userId, url) {
		let auth0Manage;
		this.getCurrentUser((error, profile) => {
			this.getUser(profile.sub, userData => {
				this.getManagementAPIAccessToken((error, response, body) => {
					var key = JSON.parse(response.body).access_token;
					auth0Manage = new Auth0.Management({
						domain: 'emarkchrome.auth0.com',
						token: key,
						audience: 'https://emarkchrome.auth0.com/api/v2/'
					});
					console.log(userData)
					if (userData.user_metadata && userData.user_metadata.saved_houses) {
						console.log(this);
						this.requestCooldownInitiator(() => {
							auth0Manage.patchUserMetadata(userId, { "saved_houses": userData.user_metadata.saved_houses.concat(url) }, function(error, data){
								if (error) { throw new Error() }
								console.log('it is done!!!!!!');
							});
						});
					} else {
						this.requestCooldownInitiator(() => {
							auth0Manage.patchUserMetadata(userId, { "saved_houses": [].concat(url) }, function(error, data){
								if (error) { throw new Error() }
								console.log('it is done!!!!!!');
							});
						});
					}
				});
			});
		});
	}

	getCurrentUser(cb) {
		let accessToken = this.getAccessToken();
		if(!this.currentUser.sub) {
			this.auth0.client.userInfo(accessToken, (err, profile) => {
				this.currentUser = profile;
				cb(err, profile);
			});
		} else {
			cb(null, this.currentUser);
		}
	}

	setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

	logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

	isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
