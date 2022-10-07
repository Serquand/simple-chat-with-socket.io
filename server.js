const express = require("express")
const app = express()
const server = require("http").createServer(app)

const path = require("path")

const io = require("socket.io")(server)

app.use(express.static(path.join(__dirname + '/public')))

io.on('connection', socket => {
    console.log("A new user is connected !")
    
    socket.on("newUser", (username) => {
        console.log("newUser")
        socket.broadcast.emit("update", username + " a rejoint le salon !")
    })

    socket.on("exitUser", username => {
        console.log("exitUser")
        socket.broadcast.emit("update", username + " a quitté le salon !")
    })

    socket.on("chat", text => {
        console.log("chat");
        socket.broadcast.emit("chat", text)
    })
})

server.listen(5000, () => console.log("Listening on port 5000"))