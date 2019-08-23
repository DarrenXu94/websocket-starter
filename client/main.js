let state = {
    pressed: []
}
const connectionManager = new ConnectionManager(state);
connectionManager.connect('ws://localhost:9000');

// U D L R Z X
// Put key listeners in here

const keyListener = (event) => {
    // [
    //     [38, 40, 37, 39, 90, 88],
    // ].forEach((key, index) => {


    // Sending keycodes to everyone
    if (event.type === 'keydown') {
        // console.log("down", event.keyCode)
        state.pressed.push(event.key)
        connectionManager.send({
            type: 'state-update',
            state: state,
        })

        // 
        // Draw random state things
        let template = this.document.querySelector('#player-template');
        let para = document.createElement("p");
        let node = document.createTextNode(JSON.stringify(state.pressed.join('')));
        para.appendChild(node);
        template.appendChild(para)
    }
    // })
}

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);