import React, { Component} from "react";
import Phone from './components/Phone.js'
import Messages from './components/Messages.js'
import {Container, Row, Col} from 'reactstrap'
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        
                    
<Container>
  <Row xs={2} md={4} lg={6}>
    <Col> <Phone /></Col>
    <Col>  Messages Component <br/> <Messages /></Col>
  </Row>
 
</Container>
             
           

      </div>
    );
  }
}

export default App;