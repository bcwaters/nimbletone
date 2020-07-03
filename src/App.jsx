import React, { Component} from "react";
import Notifications from './components/Notifications.jsx'
import Messages from './components/Messages.jsx'
import {Container, Row, Col} from 'reactstrap'
import "./App.css";

class App extends Component{
  
    //TODO The app should make an intitial call to the DB to load in contacts and settings to pass down
  
      constructor(props) {
        super(props);
            console.log("set data")
        this.state = {
            name: 'React',
            messages: [[   {timestamp: '12:00 7-29-20', number: '6504768039', msg:'1st Message', type: 'received'}]],
            currentMessage: 0
        };
            this.setSelectedContact = this.setSelectedContact.bind(this)
    }
    
    setSelectedContact(messageLocation){
     this.setState({currentMessage:messageLocation})
    }
    
    //TODO add navbar and foot
      componentDidMount() {
        fetch("/v1/messages")
      .then(res => res.json())
      .then(
        (result) => {
            console.log("fetched memory data")
          this.setState({
            isLoaded: true,
            messages: result
            
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
                       console.log("error fetching memory data")
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      }


    render(){
    return(
      <div className="App">

                            
<Container fluid>
  <Row>

            <Col xs={3}> ↓ Notifications component↓ <br/> <Notifications setSelectedContact={this.setSelectedContact} messages={this.state.messages}/></Col>
    <Col xs={6}>   ↓ Messages component↓ <br/> <Messages selectedContact={this.state.currentMessage} messages={this.state.messages}/></Col>

  </Row>
 
</Container>
             


      </div>
    );
  }
}

export default App;