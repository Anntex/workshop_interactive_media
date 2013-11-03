/**
 * This file describes a simple test scenario for an simple socket server defined in '../../simple_socket_server.js'.
 * In this case we use the assertion test module of the node.js API. This module give us simple
 * method to implement some unit tests. For a successful execution it is required to run the 
 * '../../simple_socket_server.js' before the test file.
 *
 * @author dennis grewe [dg060@hdm-stuttgart.de]
 */
var assert = require('assert');
var net = require('net');

var client = new net.Socket().connect(4000, function(err) {
	assert.ifError(err);					// test if an error occurred
}).on('data', function(buffer) {
	//assert.equal(buffer.toString(), "OK");	// if this line will be executed the test failed and the server stops: 'Connected' !== 'OK'
	assert.equal(buffer.toString(), "Connected");	// test if response of the server is 'Connected'
});

// after successful testing close the connection to the server
client.end();
console.log("Test was successful!");