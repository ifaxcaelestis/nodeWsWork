const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
module.exports.startServer= function startServer() {
    wss.on('connection', function connection(ws) {
        console.log('connected');
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            //广播消息
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
    });
}
