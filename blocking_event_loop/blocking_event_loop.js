/**
 * This file will show how the event loop thread of node.js can block the entire server.
 * This is simple because the processing of events in node.js is synchronous. Do not be
 * confused. Only the I/O operations in node.js are asynchronous. 
 * 
 * @author dennis.grewe [dg060@hdm-stuttgart.de] 10/21/2013
 */
 
 var net = require('net');
 var counter = 0;
 
 /* create socket server and listen on localhost:4000*/
net.createServer().on('connection', function(socket) {
	
	var i = 0;
	
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
	
}).listen(4000);
console.log("Server is running on port 4000");