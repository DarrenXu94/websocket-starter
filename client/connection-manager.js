class ConnectionManager {
    constructor() {
        this.conn = null;
        this.peers = new Map;

        this.state = {}
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', () => {
            console.log('Connection established');
            this.initSession();
            // this.watchEvents();
        });

        this.conn.addEventListener('message', event => {
            console.log('Received message', event.data);
            this.receive(event.data);
        });
    }

    initSession() {
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
    }

    watchEvents() {
        // Initialise the local key watchers
        // Example
        // 

        //     const player = local.player;
        //     ['pos', 'matrix', 'score'].forEach(key => {
        //         player.events.listen(key, () => {
        //             this.send({
        //                 type: 'state-update',
        //                 fragment: 'player',
        //                 state: [key, player[key]],
        //             });
        //         });
        //     });

        //     const arena = local.arena;
        //     ['matrix'].forEach(key => {
        //         arena.events.listen(key, () => {
        //             this.send({
        //                 type: 'state-update',
        //                 fragment: 'arena',
        //                 state: [key, arena[key]],
        //             });
        //         });
        //     });
    }

    updateManager(peers) {
        const me = peers.you;
        const clients = peers.clients.filter(client => me !== client.id);
        console.log(peers, "peers")
        clients.forEach(client => {
            if (!this.peers.has(client.id)) {
                // Send a message or something?
                this.peers.set(client.id, {});

            }
        });

        [...this.peers.entries()].forEach(([id, tetris]) => {
            if (!clients.some(client => client.id === id)) {
                //         this.tetrisManager.removePlayer(tetris);
                this.peers.delete(id);
            }
        });

        // const local = this.tetrisManager.instances[0];
        // const sorted = peers.clients.map(client => this.peers.get(client.id) || local);
        // this.tetrisManager.sortPlayers(sorted);
    }

    updatePeer(id, state) {
        if (!this.peers.has(id)) {
            throw new Error('Client does not exist', id);
        }

        this.peers.set(id, state)
        console.log(this.peers)

        // const tetris = this.peers.get(id);
        // tetris[fragment][key] = value;

        // if (key === 'score') {
        //     tetris.updateScore(value);
        // } else {
        //     tetris.draw();
        // }
    }

    receive(msg) {
        const data = JSON.parse(msg);
        if (data.type === 'session-created') {
            window.location.hash = data.id;
        } else if (data.type === 'session-broadcast') {
            // Game ticks?
            this.updateManager(data.peers);
        } else if (data.type === 'state-update') {
            // Peer input?
            console.log(data)
            this.updatePeer(data.clientId, data.state);
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn.send(msg);
    }
}