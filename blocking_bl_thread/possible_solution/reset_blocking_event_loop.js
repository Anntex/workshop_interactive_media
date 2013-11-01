/**
 * This file will show how a blocked business logic thread of node.js and so the event loop can be resolved.
 * In the present time there is no mechanism to allow a reset of the main thread using the event loop.
 * This can be achieved by another server or a child process polling the main server. If
 * the server is blocked, the other instance could reset the server. 
 * 
 * @author dennis.grewe [dg060@hdm-stuttgart.de] 10/21/2013
 * @see http://nodejs.org/api/child_process.html
 */
 
 var net = require('net');
 var polling_client = require('child_process').fork('polling_client.js');
 var counter = 0;
 var mainServer = null;
 
/* create socket server and listen on localhost:4000*/
function MainServer() {

	var server = net.createServer();
	this.startServer = function() {
		server.on('connection', function(socket) {
			
			var i = 0;
			
			/* register end event. if client close connection decrease the counter.*/
			socket.on('end', function() {
				counter--;
			});
			
			/* On every connection check counter to be less than or equals 1. 
			 * If there are more than one open connections, jump into a infinite while loop.
			 * This is only an example but can be forced by a computationally intensive operation (e.g.: complex database query) */
			if (counter > 0) {
				console.log("INFINITE LOOP");
				
				/* After jumping into while loop, the node.js main thread is waiting for a response. 
				 * The server accepts future connections, but there is no more activity. At the present time
				 * there is no way to reset or manipulate the event-loop. */
				while(true){
					i++;
				}
			}
			
			counter++;
			console.log("connected to server");
			socket.write("OK");					// write OK statement to the connected client
			

			
		}).listen(4000, function() {
			/* call worker process the main server reference to poll server */
			polling_client.send('mainServer', this);
		});
		console.log("Main server is running on port 4000");
	}

	/* stops a running server */
	this.stopServer = function() {
		server.close();
	}
}

/* run server */
mainServer = new MainServer();
mainServer.startServer();

module.exports = MainServer;