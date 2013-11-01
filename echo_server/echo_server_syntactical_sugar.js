/**
 * This file describes a simple node.js echo server. If the
 * server receives data, this data will be streamed back to the client in upper case letters immediately.
 * This file describes the same functionality as the echo_server.js but in shorter syntax.
 *
 * @author dennis.grewe [dg060@hdm-stuttgart.de]
 */ 

require('net').createServer(function(socket) {
	socket.write('Echo server!\n')
	socket.setEncoding('utf-8');
	socket.pipe(socket);
}).listen(4000);