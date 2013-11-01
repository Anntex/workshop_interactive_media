/**
 * This file describes a simple node.js echo server. If the
 * server receives data, this data will be streamed back to the client immediately.
 *
 * @author dennis.grewe [dg060@hdm-stuttgart.de]
 */ 

var net = require('net');						// require the net module from node
var server = net.createServer();				// create a new server

server.on('connection', function(socket) {
	socket.write('Echo server!\n');				// if client connects to server write 'Echo server' to the client
	socket.setEncoding('utf-8');				// set encoding utf-8
	socket.on('data', function(data) {			// if socket receives some data
		socket.write(data.toUpperCase());		// write the same data in upper case letters back to the client
	});
});

server.listen(4000);							// server listen on port 4000