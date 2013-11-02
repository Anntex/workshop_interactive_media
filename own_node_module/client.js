/**
 * This file describes how to create an own module in node.js. 
 * In this example a simple client module will be created. 
 * This client module can be used in an e-commerce system, or for other purposes.
 *
 * @author dennis grewe [dg060@hdm-stuttgart.de]
 */
 
 /* A simple client object with one property: name.*/
 function Client() {
 
	this.name = null;
	
	// getter for the name property
	this.getName = function() {
		return this.name;
	}
	
	// setter for the name property
	this.setName = function(name) {
		this.name = name;
	};
 }
 
 /* Add client module to global 'exports' property to use it in other modules. 
  * This can be understand as the concept of namespacing. 
  * We can access the client module by knowing the namespace of Client. */
 module.exports = Client; 