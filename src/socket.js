const io = require('socket.io-client')


export default function (hostname) {
  //TODO this url needs to be set to env variable to deploy on server
    const socket = io.connect('http://' + hostname)
   
   
    function onTextReceived(componentFunction, otherFunction) {
        console.log(hostname)
            socket.on("textReceived", data => {
            componentFunction(data);
            otherFunction();
    });
        
    }
    

    return {
        onTextReceived
    }
}