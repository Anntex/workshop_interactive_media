/**
 * @see http://nodejs.org/api/child_process.html
 */

var net = require('net');

/* create a client to poll the server every second*/
process.on('message', function(message, mainServer) {
	if (message === 'mainServer') {
		setInterval(function() {
			
			var client = net.Socket();
			var serverResponse = false;
			
			/* connect to the main server */
			client.connect(4000, function() {
				setTimeout(function() {
					console.log("End up connection!");
					client.end();									// end up connection to the server
					client.destroy();
/*					if (!serverResponse) {							// if there is no response reset the server
						console.log("No response, reset server!");
						mainServer.stopServer();					// stop the server
						mainServer.startServer();					// restart the server
					}*/
				}, 500);											// wait 500ms until reset
			});
			
			/* process the server statement. If there is a response do set flag to true and prevent server reset.*/
			client.on('data', function(buffer) {
				if ('OK' === buffer.toString()) {
					console.log("Polling client receive server Response");
					serverResponse = true;
				}
			});
		}, 1000);													// call connection function every 1 seconds
		console.log("polling client is ready!");
	}
});