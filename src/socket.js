const io = require('socket.io-client')

export default function () {
  //TODO this url needs to be set to env variable to deploy on server
    const socket = io.connect('http://localhost:3000')
   
    function onTextReceived(componentFunction) {
        console.log('registerHandler called in client socket')
            socket.on("textReceived", data => {
            componentFunction(data);
       
    });
    }
    

    return {
        onTextReceived
    }
}