
const connectionManager = new ConnectionManager();
connectionManager.connect('ws://localhost:9000');

// U D L R Z X
// Put key listeners in here

const keyListener = (event) => {
    [
        [38, 40, 37, 39, 90, 88],
    ].forEach((key, index) => {
        if (event.type === 'keydown') {
            console.log("down", event.keyCode)
        }
    })
}

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);