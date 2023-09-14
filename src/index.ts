import http from 'http';
import socketClusterServer from 'socketcluster-server';

let options = {
  // ...
};

let httpServer = http.createServer();

let agServer = socketClusterServer.attach(
  httpServer,
  options,
);

httpServer.listen(8000);

console.log('Server listening on port 8000');

(async () => {
  for await (let { socket } of agServer.listener(
    'connection',
  )) {
    console.log('New connection!');
    setTimeout(() => {
      agServer.exchange.transmitPublish(
        `test`,
        `a message from the server!`,
      );
    }, 1000);

    (async () => {
      // Set up a loop to handle remote transmitted events.
      for await (let data of socket.receiver('test')) {
        console.log('New amiEvent: ', data);
      }
    })();
  }
})();
