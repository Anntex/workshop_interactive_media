/**
 * This file describes a simple socket server. This server will be used
 * to show how component in node.js can be tested. You can find the test
 * files in the './test' directory.
 *
 * @auhtor dennis grewe [dg060@hdm-stuttgart.de]
 */
 var net = require('net');

 function SimpleSocketServer() {
	
	var server = null;
	
	/* this method creates a new server instance and listen the server to port 4000*/
	this.start = function() {
		/* create a new server instance using the net module;
		 * register the connection event and send a "Connected" status*/
		var server = net.createServer().on('connection', function(socket) {
			socket.write('Connected');
		}).listen(4000);
	};
	
	/* this method stops a running server */
	this.stop = function() {
		if (server !== null) {
			server.close();
		}
	};
}

// create a new instance of SimpleSocketServer and start the server
var simpleSocketServer = new SimpleSocketServer();
simpleSocketServer.start();

module.exports = SimpleSocketServer;