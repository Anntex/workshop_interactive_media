/**
 * @see http://nodejs.org/api/child_process.html
 */
var net = require('net');
var connectionCounter = 0;

/* create a client to poll the server every second*/
process.on('message', function(m, server) {
	if (m.message === 'mainServer') {
		setInterval(function() {
			
			var client = net.Socket();
			var serverResponse = false;
			
			/* connect to the main server */
			client.connect(4000, function() {
				connectionCounter++;
				console.log("POLLING CLIENT - poll server!");
			 	setTimeout(function() {
			 		client.end();										// end up connection to the server
			 		client.destroy();
			 		// if there is no response and the connection counter is greater than 5 kill the process
			 		if (!serverResponse && connectionCounter > 5) {		
			 			console.log("POLLING CLIENT - No server response. KILL THE SERVER!");
			 			process.kill(m.pid);							// kill the server process
			 			process.exit(1);								// kill the current polling process. exit with error 
			 		}
			 	}, 500);												// wait 300ms until reset
			});
			
			/* process the server statement. If there is a response do set flag to true and prevent server reset.*/
			client.on('data', function(buffer) {
				if ('OK' === buffer.toString()) {
					console.log("POLLING CLIENT - receive server response");
					serverResponse = true;
				}
			});
		}, 1000);													// call connection function every 1 seconds
		console.log("POLLING CLIENT - ready for polling!");
	}
});