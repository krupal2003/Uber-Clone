const socketio = require('socket.io')
const userModel = require('./models/userModel')
const captainModel = require('./models/captain.model')

let io;

function initializeSocket(server) {
    io = socketio(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log("client conected with socket id " + socket.id);

        socket.on("join", async (data) => {
            const { userId, userType } = data;

            console.log(`user contected with ${userId} and type: ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        })

        socket.on('update-captain-location', async (data) => {
            const { captainId, location } = data;
            if (
                !location ||
                location.lat === undefined ||
                location.lng === undefined
            ) {
                socket.emit('error', { message: 'Location, ltd, and lng are required.' });
                return;
            }
            await captainModel.findByIdAndUpdate(captainId,
                {
                    // // location: {
                    // //     type: 'Point',
                    //     coordinates: [location.lng, location.ltd]
                    // // }
                   location: {
                       ltd: location.lat,
                       lng: location.lng
                   }
                });

        })


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    })
}

function sendMessageToSocket(socketID, messageObject) {
    if (io) {
        io.to(socketID).emit( messageObject.event,messageObject.data)
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocket }
