const  { createServer } = require('node:http');

function createApp() {
    return createServer((request, response) => {
 
    response.statusCode = 200;
    
    response.setHeader('Content-Type', 'text/html')
    // response.setHeader('Content-Type', 'application/json');
    
    // const jsonResponseBody = JSON.stringify({ location: 'Earth' });

    response.end('<html><body><h1>Welcome to the World Wide Web!</h1></body></html>')
    // response.end(jsonResponseBody);   
  })
};

module.exports = createApp;