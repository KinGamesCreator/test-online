
const { WebSocketServer } = require("ws");
const server = new WebSocketServer({port:1234});

players = {}; //Lista de datos de jugadores.

server.on("connection",(socket)=> { //Al recibir una conexión...

    socket.id = Math.floor(Math.random() * 1000).toString();

    socket.on("message", (data) => { //Al recibir un mensaje de un jugador...
        data = data.toString().replace(/\0[\s\S]*$/g,''); //Eliminar posibles carácteres no deseados.
        try { data = JSON.parse(data); } catch { return; }; //Intentar parsear los datos recibidos.

        players[socket.id] = { //Actualizar información de juego.
            x : data.x,
            y : data.y
        }

    });

    socket.on('close', ()=> {
        console.log("CLOSE");
        delete players[socket.id];
    });

});

setInterval(()=>{ server.clients.forEach((s) => s.send(JSON.stringify(players))); },33); //Enviar información actualizada a todos los usuarios.
