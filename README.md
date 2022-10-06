# NodeJS
Our integration test in app.test.js expects a JSON response.

Change the test to expect an HTML response header: Content-Type: text/html

Change the test to expect this HTML in response.text:

Welcome to the World Wide Web!
Run the test with npm test — it should fail.
Update the code in app.js to send the HTTP response the test expects.
Run the test with npm test — it should pass.
