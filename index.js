const WebSocket = require('ws');
const ip = require('ip');
 
const PORT = process.env.PORT || 8080; // Render assigne automatiquement un port
const server = new WebSocket.Server({ port: PORT });
 
console.log(`Server started on ws://${ipadress}:${PORT}`);
 
let listusers = [];
 
server.on('connection', (ws) => {
    console.log('Client connecté.');
    //add user to list
    listusers.push(ws);
 
    ws.on('message', (message) => {
        console.log(`Message reçu : ${message}`);
        //ws.send(`Message bien reçu : ${message}`);
        //send message to all users
        let i = 0;
        listusers.forEach(user => {
            i++
            console.log(i)
            let msg = message.toString();
            user.send(msg);
        });
    });
 
    ws.on('close', () => {
        console.log('Client déconnecté.');
        //remove user from list
        listusers = listusers.filter(user => user !== ws)
    });
 
    ws.on('error', (err) => {
        console.error('Erreur WebSocket:', err);
    });
});
 
 