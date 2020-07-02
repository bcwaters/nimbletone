import React, { Component} from "react";
import Phone from './components/Phone.js'
import Messages from './components/Messages.js'
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
              <Phone />
              <Messages />

      </div>
    );
  }
}

export default App;