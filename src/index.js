'use strict';

const Alexa = require('alexa-sdk');
const request = require('request');
const http = require('http');
const Promise = require('promise');

const APP_ID = 'amzn1.ask.skill.1e1e726e-2976-474f-bc0a-46df6e4a459a';
const handlers = {
	'LaunchRequest': function () {
		this.emit('Activate');
	},
	'Activate': function(req, res) {
		var message = '';
		var destination = {
			host: 'domain',
			port: ****,
			path: 'endpoint'
		};
		var promise = new Promise(function(resolve, reject){
			http.get(destination, function(error, response){
				if(!error){
					this.emit(':tell', 'Garage Door Activated');
					message = 'The garage door has been activated';
					resolve(message);
					console.log(message);
				} else {
					this.emit(':tell', 'Something went wrong');
					message = 'Failed';
					console.log(error);
					reject(message);
				}
			});
		});
		return promise;
	},
	'AMAZON.StopIntent': function (intent, session, response) {
		var output = 'The garage door has been activated';
		return this.emit(':tellWithCard', output, 'garage door', output);
	},
	'SessionEndedRequest': function () {
		console.log('session ended!');
		this.attributes['endedSessionCount'] += 1;
		this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
	},
	'NewSession': function () {
		console.log('new new');
		this.emit('LaunchRequest'); // Uses the handler in newSessionHandlers
	},
	'Unhandled': function() {
		console.log('shits broke');
		this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
	}
};

process.on('uncaughtException', function (err) {
	console.log(err);
});

exports.handler = (event, context) => {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
