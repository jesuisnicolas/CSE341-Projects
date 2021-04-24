const fs = require('fs');

/* Here I'm creating a global constant with an array of users names.
* Another option was to save the information in a Json file, but this way 
* seemed much more simple, though the data isn't save after the server 
* is stopped.
*/
const usersArray = ["Matt", "John", "Marie", "Clara"];

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html><head><title>CSE 341 - Prove 01</title></head>');
        res.write('<main><h1>Hi! Greetings from this first Assignment.</h1>');
        res.write('<form action="/create-user" method="POST"><label for="username">Username:</label><br><input type="text" name="username"><button type="submit">Send</button></form>')
        res.write('</main></html>');
        return res.end();
    }
    if(url == '/users'){ //&& method === 'POST'
        res.write('<html><head><title>CSE 341 - Prove 01</title></head>');
        res.write('<main><h1>Here is a list of users:</h1>');
        res.write('<ul>');
        usersArray.forEach(username => {
            res.write(`<li>${username}</li>`);
        });        
        res.write('</ul>');
        res.write('</main></html>');
        return res.end();
        };
    
    if(url == '/create-user' && method === 'POST'){
        //When we use this we receive the data sent via POST as key-value pairs
        //using the names of the html.
        req.on('data', (chunk) => { 
            let username = chunk.toString();
            username = username.split('=')[1];
            usersArray.push(username);
            console.log(`The username added is: ${username}`);
        });
        return req.on('end', () => {
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();    
        }); 
    }
}
    
exports.handler = requestHandler;