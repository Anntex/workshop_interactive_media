/**
 * This file describes a simple test scenario for an simple socket server defined in '../../simple_socket_server.js'.
 * In this case we use the mocha test framework. Please install the mocha framework before lunching the test.
 * To install the framework use NPM (command 'npm install mocha') in your console. 
 * The developers of mocha claim: 
 *		'Mocha is a feature-rich JavaScript test framework running on node.js and the browser,
 * 		making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, 
 * 		while mapping uncaught exceptions to the correct test cases.This module give us simple.'
 * 
 * @author dennis grewe [dg060@hdm-stuttgart.de]
 * @see http://visionmedia.github.io/mocha/
 */
var SimpleSocketServer = require('../simple_socket_server.js');
var assert = require('assert');
var net = require('net');

/* the mocha framework supports different kinds of testing methods. In this case we will use the Test Driven Development (TDD) method
 * but mocha also knows the Behavior Driven Development (BDD) method. 
 * Another nice feature of mocha is the possibility to define tests suites. Each test suite is self-contained.*/
suite('Connection test suite', function() {

	var simpleSocketServer = null;
	
	/* mocha supports setUp functionality, for example to start our 
	 * simple socket server, before testing the functionality. */
	setup(function() {
		simpleSocketServer = new SimpleSocketServer();
		simpleSocketServer.start();
	});
	
	/* define a new test case to test the connection to the server;
	 * Be careful: The connection operation is an asynchronous operation. It is possible that
	 * the server is not ready yet for any connections. So we define a 20 milliseconds timeoute to wait
	 * before we try to connect to the server.*/
	test("should connect to the simple socket server on localhost:4000", function(done) {
		setTimeout(function() {
			var client = net.connect(4000, function() {				// connect to the server on port 4000
				client.on('data', function(buffer) {				// receive the "Connected" message
					assert.equal(buffer.toString, 'Connected');		// test if the message is correct
					done();											// call the framework the test is done
				});
			});
		}, 20);
	});
	
	/* after the test cases shut down the simple socket server */
	teardown(function() {
		if (simpleSocketServer !== null) {
			simpleSocketServer.stop();
		}
	});
});