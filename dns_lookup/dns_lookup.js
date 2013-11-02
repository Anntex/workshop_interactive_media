/**
 * This file describes the functionality to lookup an web url using the
 * dns module of the node.js API.
 *
 * @author dennis grewe [dg060@hdm-stuttgart.de]
 * @see http://nodejs.org/api/dns.html
 */
 var dns = require('dns');
 
 /* the lookup method resolves a domain into the IPv4 or IPv6 record.*/
 dns.lookup('www.hdm-stuttgart.de', function(err, address) {	
	if (err) 
		throw err;
	
	/* log the founded address to console*/
	console.log('One of the ip addresses of www.hdm-stuttgart.de: ' + address.toString());
	
	/* to test the address, do reverse operations and resolve the domain of the address*/
	dns.reverse(address, function(err, domains) {
		if (err)
			throw err;
		console.log('Reverse test for ' + address.toString() + ': ' + JSON.stringify(domains));
	});
 });