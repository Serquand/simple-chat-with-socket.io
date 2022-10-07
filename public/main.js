(function() {
    const app = document.querySelector(".app")
    const socket = io();
    let username;

    app.querySelector("#join-user").addEventListener('click', () => {
        username = app.querySelector("#username").value 
        if(username.length == 0) return
        socket.emit("newUser", username)
        app.querySelector(".join-screen").classList.remove("active")
        app.querySelector(".chat-screen").classList.add("active")
    })
    
    app.querySelector("#send-message").addEventListener("click", () => {
        let message = app.querySelector(".chat-screen input").value
        if(message.length == 0) return
        renderMessage("me", { user: 'You', message })

        socket.emit("chat", { username, message })

        app.querySelector(".chat-screen input").value = ''
        
    })

    app.querySelector("#exit-chat").addEventListener("click", () => {
        console.log('tEST')
        socket.emit("exitUser", username)
        window.location.reload()
    })

    socket.on("chat", message => renderMessage("other", message))
    socket.on("update", message => renderMessage("update", message))

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        let el = document.createElement("div");
        if(type == 'me') {
            el.setAttribute("class", "message my-message")

            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.message}</div>
                </div>
            `
        } else if(type == "other") {
            el.setAttribute("class", "message other-message")

            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.message}</div>
                </div>
            `
        } else {
            el.setAttribute("class", "update")
            el.innerText = message
        }
        messageContainer.appendChild(el)
    }
})();