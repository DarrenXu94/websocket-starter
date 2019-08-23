# websocket-starter

### What

This project is a generic server side websocket server with example client side code to show how it would work

### How to use the websocket server in code

(All this code can be found in the repo, I am just describing the functionality here)

On the client side JS set up a websocket connection 

Eg.
```
this.conn = new WebSocket(address);
```

Initialise the session by checking the session id in the URL
```
const sessionId = window.location.hash.split('#')[1];
if (sessionId) {
  this.send({
          type: 'join-session',
          id: sessionId,
          state: this.state,
      });
  } else {
      this.send({
          type: 'create-session',
          state: this.state,
      });
  }
```
Have a receiver listening
1. Add an event listener
```
this.conn.addEventListener('message', event => {
    console.log('Received message', event.data);
    this.receive(event.data);
});
```
2. Change the url to reflect the session
```
window.location.hash = data.id;
```

A message with the type 'session-broadcast' is sent from the server to all the connections. This could rely information such as someone joining or leaving the session

A message with the type 'state-update' is a direct input from the client
(You must ensure this yourself)
```
connectionManager.send({
    type: 'state-update',
    state: "Initial state",
})
```
You should update your local data to reflect this state update
