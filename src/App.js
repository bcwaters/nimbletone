import React, { Component} from "react";
import Notifications from './components/Notifications.js'
import Messages from './components/Messages.js'
import {Container, Row, Col} from 'reactstrap'
import "./App.css";

class App extends Component{
  
    //TODO The app should make an intitial call to the DB to load in contacts and settings to pass down
    
    //TODO add navbar and foot
    render(){
    return(
      <div className="App">

                            
<Container fluid>
  <Row>

    <Col xs={6}>   ↓ Messages component↓ <br/> <Messages /></Col>

            <Col xs={3}>         ↓ Notifications component↓ <br/> <Notifications /></Col>
  </Row>
 
</Container>
             


      </div>
    );
  }
}

export default App;