/**
 * This file describes the counterpart of the use_own_module.js file.
 * It shows how to use an own module. In this case, we use the Client-Module
 * to administrate clients on a server. On every new connection a client object
 * will be created. The client can send a name to the server, which will be stored
 * in the model. 
 *
 * @author dennis grewe [dg060@hdm-stuttgart.de]
 */
 var Client = require('./client.js'),		// ask for the Client module
	 net = require('net'),					// ask for the node.js net module
	 clients = [];							// property to store all clients
	 
 var server = net.createServer();
 server.on('connection', function(socket) {
	socket.write('Please tell me your name!');
	var client = new Client();				// create a new Client object from the Client module and push it to the client array
	clients.push[client];
	
	/* if the client send his name, set it to the client object
	 * to control the name, write it back to the connected client.*/
	socket.on('data', function(data) {		
		client.setName(data.toString());
		socket.write('You said your name is: ' + client.getName());
	});
	
	// if connection ends, delete client from clients array
	socket.on('end', function() {
		clients.pop(client);
	});
 }).listen(4000);