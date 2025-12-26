const serverless = require('serverless-http'); 
const app = require('../src/index.js'); 			

const handler = serverless(app);  		      

module.exports.handler = handler;      